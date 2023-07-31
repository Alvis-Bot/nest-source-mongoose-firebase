import { Body, Controller, Delete, Post, Query, UploadedFile, UploadedFiles } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { Public } from "../common/decorator/public.decorator";
import { ApiFile, ApiFileFields, ApiFiles } from "../common/decorator/file.decorator";
import { FileTypes } from "../common/enum";
import { UploadFileDto } from "./dto/upload-file.dto";
import { UserMultiUploadDto } from "./dto/user-multi-upload.dto";
import { UserMultiFileUploadDto } from "./dto/user-multi-file-upload.dto";
import { UsersService } from "../users/users.service";
import { StorageService } from "../storage/storage.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('images')
@ApiTags('Images APIs (test)')
export class ImagesController {
  constructor(
    private readonly storageService: StorageService,
    private readonly usersService: UsersService,
  ) {}



  @Public()
  @Post("upload")
  @ApiFile("file", FileTypes.IMAGE)
  async upload(
    @Body() dto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File) {
    console.log("dto", dto);
    const imageName = await this.storageService.uploadFile(FileTypes.IMAGE, file);
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
    const avatarName = await this.storageService.uploadMultiFiles(FileTypes.IMAGE, files.avatar);
    const coverName = await this.storageService.uploadMultiFiles(FileTypes.IMAGE, files.cover);
    console.log("avatarName", avatarName);
    console.log("coverName", coverName);
  }

  @Public()
  @Delete("delete-file")
  async deleteFile(
    @Query("fileName") fileName: string) {
    await this.storageService.deleteFile(fileName);
  }

  @Public()
  @Post("multi-file-upload")
  @ApiFiles("files", 10, FileTypes.EXCEL)
  async multiFileUpload(
    @Body() dto: UserMultiFileUploadDto,
    @UploadedFiles() files: Express.Multer.File[]) {
    console.log("files", files);
    console.log("dto", dto);
    await this.storageService.uploadMultiFiles(FileTypes.EXCEL, files);
  }

  @Public()
  @Post("update-file")
  @ApiFile("file", FileTypes.IMAGE)
  async updateFile(
    @Body() dto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File) {
    const user = await this.usersService.findOneByPhone("+84394021814");
    user.avatar && await this.storageService.deleteFile(user.avatar);
    user.avatar = await this.storageService.uploadFile(FileTypes.IMAGE, file);
    await user.save();

  }

}
