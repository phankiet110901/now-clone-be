import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { Store } from './store.entity';
import { StoreService } from './store.service';

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
  changeStatusStore(@Param('idStore') idStore: string): Promise<Store> {
    return this.storeService.changeStatus(idStore);
  }
}
