import { Body, Controller, Delete, Get, Post, Query, UploadedFile, UploadedFiles } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserCreateDto } from "./dto/user-create.dto";
import { Pagination } from "../common/pagination/pagination.dto";
import { User } from "../common/schemas/user.schema";
import { AuthUser } from "../common/decorator/user.decorator";
import { ApiFile, ApiFileFields, ApiFiles } from "../common/decorator/file.decorator";
import { Public } from "../common/decorator/public.decorator";
import { UserMultiUploadDto } from "../images/dto/user-multi-upload.dto";
import { UserMultiFileUploadDto } from "../images/dto/user-multi-file-upload.dto";
import { UploadFileDto } from "../images/dto/upload-file.dto";
import { ImagesService } from "../images/images.service";
import { FileTypes } from "../common/enum";

@Controller("users")
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @Post()
  async create(@Body() dto: UserCreateDto) {
    return this.usersService.create(dto);
  }

  @Get("me")
  async getMe(@AuthUser() user: User) {
    return user;
  }

  @Get()
  async getUsers(
    @Query() pagination: Pagination) {
    return this.usersService.getUsers(pagination);
  }
}
