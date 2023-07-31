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
import { StorageModule } from './storage/storage.module';

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
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return [
          {
            rootPath: join(__dirname, '..', '..', configService.get<string>('FOLDER_UPLOAD')),
            serveRoot: '/',
          },
        ];
      },
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
    StorageModule,

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