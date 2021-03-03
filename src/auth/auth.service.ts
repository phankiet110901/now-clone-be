import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/admin.entity';
import { Store } from 'src/store/store.entity';
import { StoreRepository } from 'src/store/store.repository';
import { AdminRepository } from './../admin/admin.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateStoreDto } from './dto/create-store.dto';
import { LoginAdminDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminRepository)
    private readonly adminRepo: AdminRepository,
    @InjectRepository(StoreRepository)
    private readonly storeRepo: StoreRepository,
  ) {}

  createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminRepo.createAdmin(createAdminDto);
  }

  loginAdmin(loginAdminDto: LoginAdminDto): Promise<Object> {
    return this.adminRepo.loginAdmin(loginAdminDto);
  }

  createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storeRepo.createStore(createStoreDto);
  }
}
