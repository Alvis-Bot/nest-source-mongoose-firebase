import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtPayload } from "../common/type";
import { JwtService } from "@nestjs/jwt";
import { User } from "../common/schemas/user.schema";
import { LoginDto } from "./dto/login.dto";
import { CodeUtil } from "../common/utils/code.util";
import { ApiException } from "../exception/api.exception";
import ErrorCode from "../exception/error.code";
import ErrorMessages from "../exception/error.code";
import ErrorCodes from "../exception/error.code";


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}


  async login(dto: LoginDto, { phone}: User) {
     const isUserExist = await this.usersService.existsByPhone(phone);
      if (!isUserExist) {
        throw  new ApiException(ErrorMessages.USER_NOT_FOUND)
      }
      return this.usersService.updateFcmToken(isUserExist, dto.fcmToken)
  }

}