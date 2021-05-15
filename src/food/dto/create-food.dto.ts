import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  nameFood: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsUUID(4)
  idStore: string;
}
