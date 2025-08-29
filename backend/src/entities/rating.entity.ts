import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { StoreEntity } from './store.entity';

@Entity()
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  value: number; // 1-5 rating

  @ManyToOne(() => UserEntity, (user) => user.rating, { eager: true })
  user: UserEntity;

  @ManyToOne(() => StoreEntity, (store) => store.rating, { eager: true })
  store: StoreEntity;
}
