import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from './food.entity';
import { FoodRepository } from './food.repository';
import { iFoodResponse } from './interfaces/food.interface';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepo: FoodRepository,
  ) {}

  createNewFood(createFoodDto: CreateFoodDto): Promise<iFoodResponse> {
    return this.foodRepo.createNewFood(createFoodDto);
  }

  getAllFoods(): Promise<iFoodResponse[]> {
    return this.foodRepo.getAllFoods();
  }
}
