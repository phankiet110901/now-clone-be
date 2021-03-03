import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './store.entity';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreRepository)
    private readonly storeRepo: StoreRepository,
  ) {}

  getAllStore(): Promise<Store[]> {
    return this.storeRepo.getAllStore();
  }

  getStorePagination(limit: number, currentPage: number): Promise<Object> {
    return this.storeRepo.getStorePagination(limit, currentPage);
  }

  changeStatus(idStore: string): Promise<Store> {
    return this.storeRepo.changeStatus(idStore);
  }

  uploadAvatar(fileName: string, idStore: string): Promise<Store> {
    return this.storeRepo.uploadAvatar(fileName, idStore);
  }

  updateAdmin(updateStoreDto: UpdateStoreDto, idStore: string): Promise<Store> {
    return this.storeRepo.updateStore(updateStoreDto, idStore);
  }
}
