import { Inject, PipeTransform } from "@nestjs/common";
import sharp from "sharp";
import { ConfigService } from "@nestjs/config";
import { REQUEST } from "@nestjs/core";

export class ParseFilesPipe implements PipeTransform {

  private validTypes = new Set(["image/png", "image/jpg", "image/jpeg"]);
  private maxSize = 1024 * 1024; // 1MB
  async transform(value: Express.Multer.File[] | Express.Multer.File) {
    Array.isArray(value) ? await this.resizeImages(value) : await this.resizeImage(value);
    return value;
  }

  private async resizeImage(file: Express.Multer.File) {
    if (this.validTypes.has(file.mimetype) && file.size > this.maxSize) {
      const info = await sharp(file.buffer).metadata();
      file.buffer = await sharp(file.buffer).resize({
        width: info.width / 2, // giảm kích thước ảnh xuống 50%
        height: info.height / 2, // giảm kích thước ảnh xuống 50%
        fit: sharp.fit.inside, // không cắt ảnh
        withoutEnlargement: true // không phóng to ảnh
      })
        .toFormat("jpeg") // chuyển đổi ảnh sang định dạng jpeg để giảm kích thước ảnh
        .toBuffer();
    }
  }

  private async resizeImages(files: Express.Multer.File[]) {
    for (const file of files) {
      await this.resizeImage(file);
    }
  }


}