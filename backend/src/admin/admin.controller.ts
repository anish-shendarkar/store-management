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
  async create(@Body() createUserByAdminDto: CreateUserByAdminDto) {
    return this.adminService.createUser(createUserByAdminDto);
  }

  @Post('addstore')
  async addStore(@Body() createStoreDto: CreateStoreDto) {
    return this.adminService.addStore(createStoreDto);
  }

  @Get('totalusers')
  async getTotalUsers() {
    return this.adminService.getTotalUsers();
  }

  @Get('totalstores')
  async getTotalStores() {
    return this.adminService.getTotalStores();
  }

  @Get('totalratings')
  async getTotalRatings() {
    return this.adminService.getTotalRatings();
  }

  @Get('storesinfo')
  async getStoresInfo() {
    return this.adminService.getStoresInfo();
  }

  @Get('normalusersinfo')
  async getNormalUsersInfo() {
    return this.adminService.getNormalUsersInfo();
  }

  @Get('adminusersinfo')
  async getAdminUsersInfo() {
    return this.adminService.getAdminUsersInfo();
  }

  @Get('allusersinfo')
  async getAllUsersInfo() {
    return this.adminService.getAllUsersInfo();
  }
}
