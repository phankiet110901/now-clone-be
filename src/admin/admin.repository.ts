import { EntityRepository, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from '../auth/dto/create-admin.dto';
import { v4 as uuidv4 } from 'uuid';
import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { LoginAdminDto } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { HandleToken } from './../sharing/handle-token.module';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async getAllAdmin(): Promise<Admin[]> {
    const allUser = await this.find({ where: { type_admin: 'normal' } });

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
    const foundAdmin = await this.findOne({
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

  async loginAdmin(loginAdminDto: LoginAdminDto): Promise<Object> {
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

  async getAllUser() {}

  async getAllDriver() {}

  private handleReponse(admin: Admin): Admin {
    if (admin.avatar_admin) {
      admin.avatar_admin = `${process.env.DOMAIN}admin/${admin.avatar_admin}`;
    }
    delete admin.password;
    delete admin.type_admin;
    return admin;
  }
}
