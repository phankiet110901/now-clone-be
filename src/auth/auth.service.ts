import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/admin.entity';
import { AdminRepository } from './../admin/admin.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepo: AdminRepository,
  ) {}

  createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminRepo.createAdmin(createAdminDto);
  }

  loginAdmin(loginAdminDto: LoginAdminDto) {
    return this.adminRepo.loginAdmin(loginAdminDto);
  }
}
