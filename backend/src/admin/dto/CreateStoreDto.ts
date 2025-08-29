import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  ownerId: number;
}
