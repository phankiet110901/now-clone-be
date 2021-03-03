import { EntityRepository, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from '../auth/dto/create-admin.dto';
import { v4 as uuidv4 } from 'uuid';
import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { HandleToken } from './../sharing/handle-token.module';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as fs from 'fs';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async getAllAdmin(): Promise<Admin[]> {
    const allUser: Admin[] = await this.find({
      where: { type_admin: 'normal' },
    });

    return allUser.map((admin) => {
      return this.handleReponse(admin);
    });
  }

  async getAdminPagination(
    limit: number,
    currentPage: number = 1,
  ): Promise<Object> {
    const skip: number = (currentPage - 1) * limit;

    const [allAdmin, total] = await this.findAndCount({
      where: { type_admin: 'normal' },
      take: limit,
      skip,
    });

    const totalPage: number = Math.ceil(total / limit);

    if (totalPage < currentPage) {
      throw new BadRequestException(
        `Current page can not more than total page`,
      );
    }

    return {
      totalPage,
      currentPage,
      totalItems: total,
      items: allAdmin.map((item) => this.handleReponse(item)),
    };
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const foundAdmin: Admin = await this.findOne({
      user_name: createAdminDto.user_name,
    });

    if (foundAdmin) {
      throw new BadRequestException(
        `Username '${createAdminDto.user_name}' have already exits !!!`,
      );
    }

    const newAdmin = new Admin();
    newAdmin.id_admin = uuidv4();

    for (const key in createAdminDto) {
      newAdmin[key] = createAdminDto[key];
    }

    try {
      await newAdmin.save();
    } catch {
      throw new BadGatewayException('Something wrong !! Can not add admin');
    }
    return newAdmin;
  }

  async loginAdmin(loginAdminDto: LoginDto): Promise<Object> {
    const foundAdmin = await this.findOne({
      user_name: loginAdminDto.user_name,
    });

    if (!foundAdmin) {
      throw new BadRequestException(`Wrong Username`);
    }

    const checkPass = await bcrypt.compare(
      loginAdminDto.password,
      foundAdmin.password,
    );
    if (!checkPass) {
      throw new BadRequestException(`Wrong password`);
    }

    const token: string = new HandleToken().sign({
      idUser: foundAdmin.id_admin,
    });

    return {
      ...this.handleReponse(foundAdmin),
      accessToken: token,
    };
  }

  private handleReponse(admin: Admin): Admin {
    admin.avatar_admin = `${process.env.DOMAIN}/admin/${admin.avatar_admin}`;
    delete admin.password;
    delete admin.type_admin;
    return admin;
  }

  async updateAdmin(
    updateAdminDto: UpdateAdminDto,
    idAdmin: string,
  ): Promise<Admin> {
    const foundAdmin: Admin = await this.findOne({
      where: { id_admin: idAdmin },
    });

    if (!foundAdmin) {
      throw new BadRequestException(`Can not found id ${idAdmin}`);
    }
    foundAdmin.password = await bcrypt.hash(
      updateAdminDto.password,
      +process.env.BCRYPT_SALT,
    );
    foundAdmin.address = updateAdminDto.address;
    foundAdmin.phone = updateAdminDto.phone;

    await foundAdmin.save();

    return this.handleReponse(foundAdmin);
  }

  async deleteAdmin(idAdmin: string): Promise<Admin> {
    const foundAdmin: Admin = await this.findOne({
      where: { id_admin: idAdmin },
    });

    if (!foundAdmin) {
      throw new BadRequestException(`Can not find admin id '${idAdmin}'`);
    }

    if (foundAdmin.avatar_admin) {
      fs.unlinkSync(`public/admin/${foundAdmin.avatar_admin}`);
    }
    await this.delete(foundAdmin);

    return this.handleReponse(foundAdmin);
  }

  async uploadAdminAvatar(fileName: string, idAdmin: string): Promise<Admin> {
    const foundAdmin: Admin = await this.findOne({
      where: { id_admin: idAdmin },
    });

    if (!foundAdmin) {
      throw new BadRequestException(`Can not find admin id '${idAdmin}' `);
    }

    if (foundAdmin.avatar_admin) {
      fs.unlinkSync(`public/admin/${foundAdmin.avatar_admin}`);
    }

    foundAdmin.avatar_admin = fileName;
    await foundAdmin.save();
    return this.handleReponse(foundAdmin);
  }
}
