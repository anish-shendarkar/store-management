import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { StoreEntity } from './store.entity';
import { RatingEntity } from './rating.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(20, 60)
    name: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @Length(8, 16)
    password: string;

    @Column()
    address: string;

    @Column()
    role: string;

    @OneToMany(() => StoreEntity, (store) => store.owner)
    stores: StoreEntity[];

    @OneToMany(() => RatingEntity, (rating) => rating.user)
    rating: RatingEntity[];
}
