import { Body, Controller, Delete, Get, Post, Query, UploadedFile, UploadedFiles } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserCreateDto } from "./dto/user-create.dto";
import { Pagination } from "../common/pagination/pagination.dto";
import { User } from "../common/schemas/user.schema";
import { AuthUser } from "../common/decorator/user.decorator";
import { ApiFile, ApiFileFields, ApiFiles } from "../common/decorator/file.decorator";
import { Public } from "../common/decorator/public.decorator";
import { UserMultiUploadDto } from "./dto/user-multi-upload.dto";
import { UserMultiFileUploadDto } from "./dto/user-multi-file-upload.dto";
import { UploadFileDto } from "./dto/upload-file.dto";
import { ImagesService } from "../images/images.service";
import { FileTypes } from "../common/enum";

@Controller("users")
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly imagesService: ImagesService
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

  @Public()
  @Post("upload")
  @ApiFile("file", FileTypes.IMAGE)
  async upload(
    @Body() dto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File) {
    const imageName = await this.imagesService.uploadImage(FileTypes.IMAGE, file);
  }

  @Public()
  @Post("multi-field-upload")
  @ApiFileFields([
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 }
  ], FileTypes.IMAGE)
  async multiFieldUpload(
    @Body() dto: UserMultiUploadDto,
    @UploadedFiles() files: {
      avatar: Express.Multer.File[];
      cover: Express.Multer.File[];
    }) {
    const avatarName = await this.imagesService.uploadImages(FileTypes.IMAGE, files.avatar);
    const coverName = await this.imagesService.uploadImages(FileTypes.IMAGE, files.cover);
    console.log("avatarName", avatarName);
    console.log("coverName", coverName);
  }

  @Public()
  @Delete("delete-file")
  async deleteFile(
    @Query("fileName") fileName: string) {
    await this.imagesService.deleteImage(fileName);
  }

  @Public()
  @Post("multi-file-upload")
  @ApiFiles("files", 10, FileTypes.IMAGE)
  async multiFileUpload(
    @Body() dto: UserMultiFileUploadDto,
    @UploadedFiles() files: Express.Multer.File[]) {
    await this.imagesService.uploadImages(FileTypes.IMAGE, files);
  }

  @Public()
  @Post("update-file")
  @ApiFile("file", FileTypes.IMAGE)
  async updateFile(
    @Body() dto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File) {
     const user = await this.usersService.findOneByPhone("+84394021814");
      user.avatar && await this.imagesService.deleteImage(user.avatar);
      user.avatar = await this.imagesService.uploadImage(FileTypes.IMAGE, file);
      await user.save();

  }

  @Get()
  async getUsers(
    @Query() pagination: Pagination) {
    return this.usersService.getUsers(pagination);
  }
}
