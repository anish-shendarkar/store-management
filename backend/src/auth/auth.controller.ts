import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req) {
    const userId = req.user.id;
    return this.authService.logout(userId, req.user.token);
  }
}
