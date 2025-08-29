import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { StoreEntity } from 'src/entities/store.entity';
import { RatingEntity } from 'src/entities/rating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      StoreEntity,
      RatingEntity
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
