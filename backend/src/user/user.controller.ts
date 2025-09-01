import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleGuard } from 'src/role.guard';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('user')
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('update-password')
  async updatePassword(
    @Req() req,
    @Body('currentPassword') currentPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    const userId = req.user.user.id;
    return await this.userService.updatePassword(userId, currentPassword, newPassword);
  }

  @Get('stores')
  async getAllStores(@Req() req) {
    const userId = req.user.user.id;
    return await this.userService.getAllStores(userId);
  }

  @Get('search/stores')
  async searchStores(@Query('q') query: string, @Req() req) {
    const userId = req.user.user.id;
    return await this.userService.searchStores(query, userId);
  }

  @Get('stores/:storeId')
  async getStoreById(@Param('storeId') storeId: number, @Req() req) {
    const userId = req.user.user.id;
    return await this.userService.getStoreWithRatings(storeId, userId);
  }

  @Post('ratestore/:storeId')
  async rateStore(@Param('storeId') storeId: number, @Body('ratingValue') ratingValue: number, @Req() req) {
    const userId = req.user.user.id;
    console.log('User ID:', userId);
    return await this.userService.rateStore(userId, storeId, ratingValue);
  }
}