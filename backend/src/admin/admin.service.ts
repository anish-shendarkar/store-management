import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserByAdminDto } from './dto/CreateUserByAdminDto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { StoreEntity } from 'src/entities/store.entity';
import { CreateStoreDto } from './dto/CreateStoreDto';
import { RatingEntity } from 'src/entities/rating.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
  ) { }

  async createUser(createUserByAdminDto: CreateUserByAdminDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserByAdminDto.email
      }
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserByAdminDto.password, salt);
    const user = this.userRepository.create({ ...createUserByAdminDto, password: hashedPassword });

    return await this.userRepository.save(user);
  }

  async addStore(createStoreDto: CreateStoreDto) {
    const owner = await this.userRepository.findOne({
      where: {
        id: createStoreDto.ownerId,
        role: 'owner'
      }
    });
    if (!owner) {
      throw new BadRequestException('Owner not found');
    }
    const store = this.storeRepository.create({ ...createStoreDto, owner });
    return await this.storeRepository.save(store);
  }

  async getTotalUsers() {
    return await this.userRepository.count();
  }

  async getTotalStores() {
    return await this.storeRepository.count();
  }

  async getTotalRatings() {
    return await this.ratingRepository.count();
  }

  async getStoresInfo() {
    return await this.storeRepository.find({ relations: ['rating'] });
  }

  async getNormalUsersInfo() {
    return await this.userRepository.find({ where: { role: 'user' }});
  }

  async getAdminUsersInfo() {
    return await this.userRepository.find({ where: { role: 'admin' }});
  }

  async getAllUsersInfo() {
    const users = await this.userRepository.find();
    
    return users.map(user => {
      const { id, name, email, address, role, rating } = user;
      return {
        id,
        name,
        email,
        address,
        role,
        ...(role === 'owner' ? { rating } : {}),
      };
    });
  }
}
