import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { RoleGuard } from 'src/role.guard';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('owner')
@UseGuards(AuthGuard('jwt'), new RoleGuard('owner'))
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get('ratings')
  async getUserRatings(@Req() req) {
    const userId = req.user.user.id;
    console.log('User ID from token:', userId); // Debugging line
    return this.ownerService.getUserRatings(userId);
  }

  @Get('ratings/average')
  async getAverageStoreRating(@Req() req) {
    const userId = req.user.user.id;
    return this.ownerService.getAverageStoreRating(userId);
  }
}
