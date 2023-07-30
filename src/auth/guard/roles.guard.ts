import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from "../../common/enum";
import { ROLES_KEY } from "../../common/decorator/roles.decorator";
import { AuthenticationRequest } from "../../common/interface";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    console.log(requiredRoles);
    const { user } = context.switchToHttp().getRequest<AuthenticationRequest>();
    return requiredRoles.some((role) => user.role === role);
  }
}