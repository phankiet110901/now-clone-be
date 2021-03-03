import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { UpdateAdminDto } from './dto/update-admin.dto';

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

  updateAdmin(updateAdminDto: UpdateAdminDto, idAdmin: string): Promise<Admin> {
    return this.adminRepo.updateAdmin(updateAdminDto, idAdmin);
  }

  deleteAdmin(idAdmin: string): Promise<Admin> {
    return this.adminRepo.deleteAdmin(idAdmin);
  }

  uploadAvatar(fileName: string, idAdmin: string): Promise<Admin> {
    return this.adminRepo.uploadAdminAvatar(fileName, idAdmin);
  }
}
