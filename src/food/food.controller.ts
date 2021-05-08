import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { FoodService } from './food.service';
import { iFoodResponse } from './interfaces/food.interface';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  getAllFood(): Promise<iFoodResponse[]> {
    return this.foodService.getAllFoods();
  }

  @Get('pagination/:limit/:currentPage')
  getFoodPagination() {
    return 'get food pagination';
  }

  @Get('store/:idStore')
  getFoodByStore() {
    return 'get food by store';
  }

  @Post()
  addNewFood(@Body() createFoodDto: CreateFoodDto): Promise<iFoodResponse> {
    return this.foodService.createNewFood(createFoodDto);
  }

  @Post()
  uploadImageForFood() {
    return 'upload img for food';
  }

  @Put()
  editInfoFood() {
    return 'edit info food';
  }

  @Patch()
  changeStatusFood() {
    return 'change status food';
  }

  @Delete()
  deleteFood() {
    return 'delete food';
  }
}
