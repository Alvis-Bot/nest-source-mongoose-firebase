import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { FirebaseService } from "../../firebase/firebase.service";
import * as firebase from "firebase-admin";
import { JwtPayload } from "../../common/type";
import { UsersService } from "../../users/users.service";
import { Reflector } from "@nestjs/core";
import { PUBLIC_KEY } from "../../common/decorator/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {

  private auth: firebase.auth.Auth;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {
    this.auth = this.firebaseService.getAuth();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const decodedIdToken = await this.auth.verifyIdToken(token);
      const payload: JwtPayload = {
        uid: decodedIdToken.uid,
        phone: decodedIdToken.phone_number,
        provider: decodedIdToken.firebase.sign_in_provider
      };

      console.log(payload);
      switch (payload.provider) {
        case "phone":
          // TODO: create user if not exist
          const isUserExist = await this.usersService.existsByPhone(payload.phone);
          request.user = !isUserExist
            ? await this.usersService.createBaseUser(payload)
            : await this.usersService.findOneByPhone(payload.phone);
          break;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}