import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import { FileTypes } from "../common/enum";
import { join } from "path";

@Injectable()
export class  ImagesService implements OnModuleInit  {

  constructor(
    private readonly configService: ConfigService
  ) {
  }

  onModuleInit(): void {
    const path = join('.', this.configService.get<string>('FOLDER_UPLOAD'));
    !fs.existsSync(path) && fs.mkdirSync(path);
  }

  async uploadImage(type: FileTypes, file: Express.Multer.File): Promise<string> {
    const fileName = this.buildImageFileName(type, file);
    const filePath = await this.buildImageFilePath(fileName);
    await fs.promises.writeFile(filePath, file.buffer);
    return fileName;
  }

  async uploadImages(type: FileTypes, files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadImage(type, file)));
  }
  private  buildImageFileName(type: FileTypes, file: Express.Multer.File): string {
    const timestamp = Date.now();
    const extension = file.originalname.split(".").pop();
    return `${type}.${file.originalname.split(".")[0]}.${timestamp}.${extension}`;
  }
  private async buildImageFilePath(fileName: string): Promise<string> {
    const folderUpload = this.configService.get<string>("FOLDER_UPLOAD");
    return join(folderUpload, fileName);
  }

  async deleteImage(fileName: string): Promise<void> {
    const filePath = await this.buildImageFilePath(fileName);
    fs.existsSync(filePath) && fs.unlinkSync(filePath);
  }
}
