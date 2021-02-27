import { EntityRepository, Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async getAllUser(): Promise<Admin[]> {
    const allUser = await this.find();

    return allUser.map((admin) => {
      return this.handleReponse(admin);
    });
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const foundAdmin = this.find({ user_name: createAdminDto.user_name });

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

    await newAdmin.save();
    return newAdmin;
  }

  private handleReponse(admin: Admin): Admin {
    if (admin.avatar_admin) {
      admin.avatar_admin = `${process.env.DOMAIN}admin/${admin.avatar_admin}`;
    }
    delete admin.password;
    return admin;
  }
}
