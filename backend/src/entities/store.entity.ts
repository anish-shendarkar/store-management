import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RatingEntity } from './rating.entity';

@Entity()
export class StoreEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    address: string;

    @ManyToOne(() => UserEntity, (user) => user.stores)
    owner: UserEntity;

    @OneToMany(() => RatingEntity, (rating) => rating.store, {onDelete: 'CASCADE'})
    rating: RatingEntity[];
}
