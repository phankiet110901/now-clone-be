import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Admin } from 'src/admin/admin.entity';
import { Store } from 'src/store/store.entity';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { LoginAdminDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login-admin')
  @UsePipes(ValidationPipe)
  loginAdmin(@Body() loginAdminDto: LoginAdminDto): Promise<Object> {
    return this.authService.loginAdmin(loginAdminDto);
  }

  @Post('register-user')
  registerUser() {}

  @Post('register-admin')
  @UsePipes(ValidationPipe)
  registerAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.authService.createAdmin(createAdminDto);
  }

  @Post('register-store')
  @UsePipes(ValidationPipe)
  registerStore(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    return this.authService.createStore(createStoreDto);
  }
}
