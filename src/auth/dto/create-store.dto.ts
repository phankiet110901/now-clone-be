import { IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  nameStore: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
