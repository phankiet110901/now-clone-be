import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { IsInt } from 'class-validator';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('get-all-admin')
  getAllAdmin(): Promise<Admin[]> {
    return this.adminService.getAllAdmin();
  }

  @Get('get-all-driver')
  getAllDriver() {}

  @Get('get-admin-pagination/:limit/:currentPage')
  getAdminPagination(
    @Param('limit', ParseIntPipe) limit: number,
    @Param('currentPage', ParseIntPipe) currentPage: number,
  ) {
    return this.adminService.getAdminPagination(limit, currentPage);
  }
}
