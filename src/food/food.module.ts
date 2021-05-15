import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodController } from './food.controller';
import { FoodRepository } from './food.repository';
import { FoodService } from './food.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodRepository])],
  controllers: [FoodController],
  providers: [FoodService]
})
export class FoodModule {}
