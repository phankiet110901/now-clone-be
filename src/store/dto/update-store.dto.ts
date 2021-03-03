import { IsNotEmpty } from "class-validator";

export class UpdateStoreDto {
  @IsNotEmpty()
  name_store: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  password: string;
}
