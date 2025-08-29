import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { RatingEntity } from 'src/entities/rating.entity';
import { StoreEntity } from 'src/entities/store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      StoreEntity,
      RatingEntity
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
