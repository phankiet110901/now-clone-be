import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImg } from 'src/sharing/upload-img.module';
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

  @Post("upload-image/:idFood")
  @UseInterceptors(
    FileInterceptor("imgFood", {
      fileFilter: UploadImg.fileFilters,
      storage: {
        destination: "./public/food",
        filename: UploadImg.handleUpload
      }
    })
  )
  uploadImageForFood(@Param("idFood") idFood: string) {
    return this.foodService.uploadImgForFood("", idFood);
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
