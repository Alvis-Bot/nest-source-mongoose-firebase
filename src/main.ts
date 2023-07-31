import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerConfig } from "./common/config/swagger.config";

import { HttpExceptionFilter } from "./exception/http-exception.filter";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CorsConfig } from "./common/config/cors.config";
import { ParseFilesPipe } from "./common/pipe/parse-file.pipe";


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  //-----------------service-----------------
  const configService = app.get(ConfigService);
  const logger = new Logger("bootstrap");
  //-----------------service-----------------




  //-----------------config-----------------
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  CorsConfig.enableCors(app);
  app.setGlobalPrefix("api", { exclude: [""] });
  // app.useGlobalPipes(new ParseFilesPipe());
  // khi chay dev và test thi se hien thi swagger
  if (configService.get<string>("NODE_ENV") === "dev") {
    SwaggerConfig.init(app);
  }
  //-----------------config-----------------



  await app.listen(configService.get("PORT"), () => {
    logger.log(
      `Listening at http://localhost:${configService.get<number>("PORT")}`
    );
    if (configService.get<string>("NODE_ENV") === "dev") {
      logger.log(
        `Swagger is running at http://localhost:${configService.get<number>("PORT")}/api`
      );
      logger.log(
        `Login firebase test is running at http://localhost:${configService.get<number>("PORT")}/public`
      );
    }
    logger.log(
      "Running in environment " + configService.get<string>("NODE_ENV")
    );
  });
}

bootstrap().then(() => Logger.log("Server started"));