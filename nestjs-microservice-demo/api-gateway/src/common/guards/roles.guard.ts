import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decoraters/roles.decorator';
import { CustomRequest, messages } from '@nestjs/shared-lib';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<CustomRequest>();
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException(messages.ACCESS_DENIED);
    }
    return requiredRoles.includes(user.role);
  }
}
