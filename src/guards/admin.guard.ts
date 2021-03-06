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
export class AdminGuard implements CanActivate {
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
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new ForbiddenException(`Token is Expired`);
      }
      throw new ForbiddenException(`Token invalid`);
    }

    const foundAdmin = await this.adminRepo.findOne({
      where: { id_admin: idUser },
    });

    if (!foundAdmin) {
      throw new UnauthorizedException('Token invalid');
    }

    return true;
  }
}
