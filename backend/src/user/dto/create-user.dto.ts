import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(20, 60, { message: 'Name must be between 20 and 60 characters long' })
    name: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 16, { message: 'Password must be between 8 and 16 characters long' })
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
        message: 'Password must contain at least one uppercase letter and one special character',
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(400, { message: 'Address can be max 400 characters long' })
    address: string;
}
