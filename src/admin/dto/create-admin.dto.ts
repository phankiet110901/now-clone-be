import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone: string;

  @IsNotEmpty()
  address: string;
}
