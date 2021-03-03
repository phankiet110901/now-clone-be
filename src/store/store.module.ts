import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreRepository } from './store.repository';
import { AdminRepository } from 'src/admin/admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StoreRepository, AdminRepository])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
