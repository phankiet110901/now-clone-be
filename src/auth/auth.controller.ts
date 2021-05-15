import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Admin } from 'src/admin/admin.entity';
import { AdminGuard } from 'src/guards/admin.guard';
import { Store } from 'src/store/store.entity';
import { AuthService } from './auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-admin')
  @UsePipes(ValidationPipe)
  loginAdmin(@Body() loginAdminDto: LoginDto): Promise<Object> {
    return this.authService.loginAdmin(loginAdminDto);
  }

  @Post('login-store')
  @UsePipes(ValidationPipe)
  loginStore(@Body() loginStore: LoginDto): Promise<Object> {
    return this.authService.loginStore(loginStore);
  }

  @Post('register-user')
  registerUser() {}

  @Post('register-admin')
  @UseGuards(AdminGuard)
  @UsePipes(ValidationPipe)
  registerAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.authService.createAdmin(createAdminDto);
  }

  @Post('register-store')
  @UsePipes(ValidationPipe)
  registerStore(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    return this.authService.createStore(createStoreDto);
  }

  @Post('refresh-token')
  checkTokenIsExpired() {

  }
}
