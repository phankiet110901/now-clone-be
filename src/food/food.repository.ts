import { EntityRepository, Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { Food } from './food.entity';
import { iFoodResponse } from './interfaces/food.interface';
import { v4 as uuidv4 } from 'uuid';
import { Store } from 'src/store/store.entity';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Food)
export class FoodRepository extends Repository<Food> {
  private handleReponse(food: Food): iFoodResponse {
    return {
      id: food.id_food,
      name: food.name_food,
      img: `${process.env.DOMAIN}/food/${food.img}`,
      price: food.price_food,
      status: food.status,
      idStore: food.store.id_store,
      nameStore: food.store.name_store,
    };
  }

  async createNewFood(createFoodDto: CreateFoodDto): Promise<iFoodResponse> {
    const newFood: Food = new Food();

    const foundStore: Store = await Store.findOne(createFoodDto.idStore);

    if (!foundStore) {
      throw new BadRequestException(
        `Can not found store id ${createFoodDto.idStore}`,
      );
    }

    newFood.id_food = uuidv4();
    newFood.name_food = createFoodDto.nameFood;
    newFood.price_food = createFoodDto.price;

    newFood.store = foundStore;
    await newFood.save();

    return this.handleReponse(newFood);
  }

  async getAllFoods(): Promise<iFoodResponse[]> {
    const allFoods: Food[] = await this.find({
      relations: ['store'],
    });
    return allFoods.map((food) => {
      return this.handleReponse(food);
    });
  }

  async uploadImgForFood(fileName: string, idFood: string) {
    const foundFood: Food = await this.findOne(idFood, {
      relations: ['store'],
    });

    if (!foundFood) {
      throw new BadRequestException(`Can not find food id ${idFood}`);
    }

    foundFood.img = fileName;

    await foundFood.save();
    return this.handleReponse(foundFood);
  }
}
