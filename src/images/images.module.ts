import { Global, Module } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { ImagesController } from './images.controller';
import { UsersModule } from "../users/users.module";

@Global()
@Module({
  imports: [
    UsersModule,
  ],
  providers: [ImagesService],
  exports: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
