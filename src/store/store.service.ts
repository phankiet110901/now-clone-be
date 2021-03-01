import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(StoreRepository)
        private storeRepo: StoreRepository
    ) {}


    getAllStore(): Promise<Store[]> {
        return this.storeRepo.getAllStore();
    }

    getStorePagination(limit: number, currentPage: number): Promise<Object> {
        return this.storeRepo.getStorePagination(limit, currentPage);
    }

    changeStatus(idStore: string) {
        return this.storeRepo.changeStatus(idStore);
    }
}
