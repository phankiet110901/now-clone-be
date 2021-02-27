import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: AdminRepository,
  ) {}

  getAllUser(): Promise<Admin[]> {
    return this.adminRepo.getAllUser();
  }

  createUser(createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminRepo.createAdmin(createAdminDto);
  }
}
