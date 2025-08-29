import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(user) {
    console.log('authservice generate token', user);
    return this.jwtService.sign({ user });
  }

  async logout(userId: number) {
    console.log('Logging out user:', userId);
    return { message: 'User logged out successfully' };
  }
}