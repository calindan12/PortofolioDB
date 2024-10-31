import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request } from 'express';
import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';






async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // URL-ul frontend-ului Angular
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });


  const userImagesPath = path.join(__dirname, '..', 'uploads', 'users');
  if (!fs.existsSync(userImagesPath)) {
    fs.mkdirSync(userImagesPath, { recursive: true });
  }

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  await app.listen(3000);
}
bootstrap();
