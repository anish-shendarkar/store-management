import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { OwnerModule } from './owner/owner.module';
import { ConfigModule } from '@nestjs/config';
import { RatingEntity } from './entities/rating.entity';
import { StoreEntity } from './entities/store.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserEntity,
        StoreEntity,
        RatingEntity
      ],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    AdminModule,
    OwnerModule,
  ],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule { }
