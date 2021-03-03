import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UpdateAdminDto {
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phone: string;
  @IsNotEmpty()
  address: string;
}
