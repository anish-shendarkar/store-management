import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { StoreEntity } from 'src/entities/store.entity';
import { RatingEntity } from 'src/entities/rating.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
  ) { }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: dto.email
      }
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const user = this.userRepository.create({ ...dto, password: hashedPassword, role: 'user' }); // default role
    return await this.userRepository.save(user);
  }

  async getUser(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      },
    });
    return user;
  }

  async updatePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt());
    user.password = hashedPassword;
    await this.userRepository.save(user);
    return { message: 'Password updated successfully' };
  }

  async getAllStores(userId: number) {
    return await this.storeRepository.find();
  }

  async searchStores(query: string, userId: number) {
    return await this.storeRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { address: ILike(`%${query}%`) }
      ],
      relations: ['rating'],
    });
  }

  async getStoreWithRatings(storeId: number, userId: number) {
    const store = await this.storeRepository.findOne({
      where: { id: storeId },
      relations: ['owner', 'rating'],
    });
    if (!store) {
      throw new BadRequestException('Store not found');
    }

    const ratings = store.rating.map(r => r.value);
    const overallRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

    const userRatingValue = await this.ratingRepository.findOne({
      where: { user: { id: userId }, store: { id: storeId } },
      select: ['id', 'value'],
    });
    const userRating = userRatingValue ? userRatingValue.value : null;
    const { password, ...ownerSafe } = store.owner; // Exclude password

    return { ...store, overallRating, userRating, owner: ownerSafe };
  }

  async rateStore(userId: number, storeId: number, ratingValue: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const store = await this.storeRepository.findOne({ where: { id: storeId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!store) {
      throw new BadRequestException('Store not found');
    }

    if (ratingValue < 1 || ratingValue > 5) {
      throw new BadRequestException('Invalid rating. Please provide a rating between 1 and 5.');
    }

    let existing = await this.ratingRepository.findOne({
      where: { store: { id: storeId }, user: { id: userId } },
      relations: ['store', 'user'],
    });
    if (existing) {
      existing.value = ratingValue;
      await this.ratingRepository.save(existing);
      return { message: 'Store rating updated successfully' };
    }
    const newRating = this.ratingRepository.create({
      value: ratingValue,
      user: user,
      store: store
    });
    await this.ratingRepository.save(newRating);
    return { message: 'Store rated successfully' };
  }
}
