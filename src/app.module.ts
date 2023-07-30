import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/guard/auth.guard";
import { ConvertToUtcTimeMiddleware } from "./common/middleware/timezone";
import { PublicModule } from './public/public.module';
import { validationSchema } from "./common/config/validation";
import { RolesGuard } from "./auth/guard/roles.guard";
import { ImagesModule } from './images/images.module';
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..' , 'public'),
      serveRoot: '/public',
    }),
    ServeStaticModule.forRoot({
     // ảnh nằm trong thư mục uploads và trong uploads có ảnh và  có thư mục images có chứa ảnh t muốn nó chung serverRoot là /images
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/images',
      renderPath: '/images',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
        dbName: configService.get<string>('DATABASE_NAME'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    FirebaseModule,
    PublicModule,
    ImagesModule,

  ],
  providers: [
    ConvertToUtcTimeMiddleware,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}