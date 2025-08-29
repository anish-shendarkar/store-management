import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('auth')
@UseGuards(AuthGuard('jwt'))
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('logout')
  async logout(@Req() req) {
    const userId = req.user.id;
    console.log(req.user.token);
    return this.authService.logout(userId);
  }
}
