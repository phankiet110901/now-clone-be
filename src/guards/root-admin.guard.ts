import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminRepository } from '../admin/admin.repository';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RootAdminGuard implements CanActivate {
  constructor(
    @InjectRepository(AdminRepository)
    private readonly adminRepo: AdminRepository,
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      return false;
    }

    const token: string = request.headers.authorization;
    let idUser: string = '';

    try {
      idUser = jwt.verify(token, process.env.SECRET_KEY).payload.idUser;
    } catch {
      throw new ForbiddenException(`Token invalid`);
    }

    const foundAdmin = await this.adminRepo.findOne({
      where: { id_admin: idUser },
    });

    if (!foundAdmin) {
      throw new UnauthorizedException('Token invalid');
    }

    if (foundAdmin.type_admin !== 'root') {
      throw new ForbiddenException('Your role can not do it !!!!');
    }
    return true;
  }
}
