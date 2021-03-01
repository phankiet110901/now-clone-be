import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreRepository } from './store.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreRepository])
  ],
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}
