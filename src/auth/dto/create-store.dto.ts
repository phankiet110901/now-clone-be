import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name_store: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
