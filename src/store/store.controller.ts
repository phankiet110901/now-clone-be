import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/guard/admin.guard';
import { UploadImg } from 'src/sharing/upload-img.module';
import { Store } from './store.entity';
import { StoreService } from './store.service';
import { diskStorage } from 'multer';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get()
  getAllStore(): Promise<Store[]> {
    return this.storeService.getAllStore();
  }

  @Get('get-store-pagination/:limit/:currentPage')
  getStorePagination(
    @Param('limit', ParseIntPipe) limit: number,
    @Param('currentPage', ParseIntPipe) currentPage: number,
  ): Promise<Object> {
    return this.storeService.getStorePagination(limit, currentPage);
  }

  @Patch('change-status/:idStore/status')
  @UseGuards(AdminGuard)
  changeStatusStore(@Param('idStore') idStore: string): Promise<Store> {
    return this.storeService.changeStatus(idStore);
  }

  @Post('upload-avatar/:idStore')
  @UseInterceptors(
    FileInterceptor('avatar_store', {
      fileFilter: UploadImg.fileFilters,
      storage: diskStorage({
        destination: './public/store',
        filename: UploadImg.handleUpload,
      }),
    }),
  )
  uploadAvatar(
    @UploadedFile() file,
    @Param('idStore') idStore: string,
  ): Promise<Store> {
    return this.storeService.uploadAvatar(file.filename, idStore);
  }
}
