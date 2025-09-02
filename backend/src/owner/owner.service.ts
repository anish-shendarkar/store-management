import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from 'src/entities/rating.entity';
import { StoreEntity } from 'src/entities/store.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
  ) { }

  async getUserRatings(userId: string) {
    const ratings = await this.ratingRepository.find({
      where: { store: { owner: { id: Number(userId) } } },
      relations: ['user', 'store'],
    });
    if(!ratings) {
      throw new BadRequestException('No ratings found');
    }
    return ratings.map(rating => ({
      user: {
        id: rating.user.id,
        name: rating.user.name,
        email: rating.user.email,
      },
      value: rating.value,
    }));
  }

  async getAverageStoreRating(userId: number) {
    const store = await this.storeRepository.findOne({
      where: { owner: { id: userId } },
      relations: ['rating'],
    });
    if (!store) {
      throw new BadRequestException('Store not found');
    }

    const ratings = store.rating.map(r => r.value);
    const overallRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
    return {
      overallRating,
    };
  }

  async getTotalRatings(userId: number) {
    const ratings = await this.ratingRepository.count({
      where: { store: { owner: { id: userId } } },
    });
    return ratings;
  }
}
