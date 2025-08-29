import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserByAdminDto } from './dto/CreateUserByAdminDto';
import { CreateStoreDto } from './dto/CreateStoreDto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role.guard';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), new RoleGuard('admin'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('createuser')
  create(@Body() createUserByAdminDto: CreateUserByAdminDto) {
    return this.adminService.createUser(createUserByAdminDto);
  }

  @Post('addstore')
  addStore(@Body() createStoreDto: CreateStoreDto) {
    return this.adminService.addStore(createStoreDto);
  }
}
