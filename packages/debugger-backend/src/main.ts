import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true
  }));
  app.enableCors({
    origin: true
  });
  await app.listen(8081);
}
bootstrap();
