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

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(20, 60)
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Length(8, 16)
    password: string;

    @Column()
    address: string;

    @Column()
    role: string;
}
