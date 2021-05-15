import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/guards/admin.guard';
import { UploadImg } from 'src/sharing/upload-img.module';
import { Store } from './store.entity';
import { StoreService } from './store.service';
import { diskStorage } from 'multer';
import { UpdateStoreDto } from './dto/update-store.dto';

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

  @Put('update-store/:idStore')
  @UseGuards(AdminGuard)
  @UsePipes(ValidationPipe)
  updateStore(
    @Body() updateStoreDto: UpdateStoreDto,
    @Param('idStore') idStore: string,
  ): Promise<Store> {
    return this.storeService.updateAdmin(updateStoreDto, idStore);
  }

  @Delete('delete-store/:idStore')
  @UseGuards(AdminGuard)
  deleteStore(@Param('idStore') idStore: string): Promise<Store> {
    return this.storeService.deleteStore(idStore);
  }
}
