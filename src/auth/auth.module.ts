import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminRepository } from './../admin/admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}