import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserGuard implements CanActivate {
 
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      return false;
    }

    const token: string = request.headers.authorization;
    let idUser: string = '';

    try {
      idUser = jwt.verify(token, process.env.SECRET_KEY);
    } catch {
      throw new ForbiddenException('Token invalid');
    }


    return true;
  }
}
