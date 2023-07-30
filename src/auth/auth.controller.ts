import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthUser } from "../common/decorator/user.decorator";
import { User } from "../common/schemas/user.schema";
import { JwtPayload } from "../common/type";

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}


  @Post('login')
  async login(
    @AuthUser() myUser: User,
    @Body() dto: LoginDto) {
    return this.authService.login(dto ,myUser);
  }

}
