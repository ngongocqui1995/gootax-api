import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ENUM_STATUS } from 'src/common';
import { ROLES } from 'src/modules/roles/contants/contants';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  logger: Logger = new Logger('role_guard');

  constructor(private reflector: Reflector) {}

  /**
   * Check can activate.
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (!user || user.status !== ENUM_STATUS.ACTIVE) return false;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    // match require roles
    return await this.isMatchRoles(roles, user);
  }

  async isMatchRoles(roles: string[], user: User) {
    if (user.role.code === ROLES.ROLE_ROOT) return true;
    if (roles.includes(user?.role?.code)) return true;

    return false;
  }
}
