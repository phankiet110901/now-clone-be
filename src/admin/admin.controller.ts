import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminGuard } from '../guard/admin.guard';
import { RootAdminGuard } from 'src/guard/root-admin.guard';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImg } from 'src/sharing/upload-img.module';
import { diskStorage } from 'multer';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('get-all-admin')
  @UseGuards(AdminGuard)
  getAllAdmin(): Promise<Admin[]> {
    return this.adminService.getAllAdmin();
  }

  @Get('get-all-driver')
  @UseGuards(AdminGuard)
  getAllDriver() {}

  @Get('get-admin-pagination/:limit/:currentPage')
  @UseGuards(AdminGuard)
  getAdminPagination(
    @Param('limit', ParseIntPipe) limit: number,
    @Param('currentPage', ParseIntPipe) currentPage: number,
  ) {
    return this.adminService.getAdminPagination(limit, currentPage);
  }

  @Delete('delete-admin/:idAdmin')
  @UseGuards(RootAdminGuard)
  deleteAdmin(@Param('idAdmin') idAdmin: string): Promise<Admin> {
    return this.adminService.deleteAdmin(idAdmin);
  }

  @Put('update-admin/:idAdmin')
  @UseGuards(RootAdminGuard)
  @UsePipes(ValidationPipe)
  updateAdmin(
    @Body() upadateAdminDto: UpdateAdminDto,
    @Param('idAdmin') idAdmin: string,
  ): Promise<Admin> {
    return this.adminService.updateAdmin(upadateAdminDto, idAdmin);
  }

  @Post('upload-avatar/:idAdmin')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    FileInterceptor('avatar_admin', {
      fileFilter: UploadImg.fileFilters,
      storage: diskStorage({
        destination: './public/admin',
        filename: UploadImg.handleUpload,
      }),
    }),
  )
  uploadAvatar(
    @UploadedFile() file,
    @Param('idAdmin') idAdmin: string,
  ): Promise<Admin> {
    return this.adminService.uploadAvatar(file.filename, idAdmin);
  }
}
