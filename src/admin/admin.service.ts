import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: AdminRepository,
  ) {}

  getAllAdmin(): Promise<Admin[]> {
    return this.adminRepo.getAllAdmin();
  }

  getAdminPagination(limit: number, currentPage: number): Promise<Object> {
    return this.adminRepo.getAdminPagination(limit, currentPage);
  }
}
