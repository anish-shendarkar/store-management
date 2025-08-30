import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { RatingEntity } from 'src/entities/rating.entity';
import { UserEntity } from 'src/entities/user.entity';
import { StoreEntity } from 'src/entities/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreEntity, UserEntity, RatingEntity]),
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
