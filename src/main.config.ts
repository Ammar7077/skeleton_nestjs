import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

const globalPrefix = 'api';

const port = 3000;

const requestLimitStringMB = '50mb';

const swaggerConfig = {
  title: 'Project',
  description: 'API Description',
  version: '1.0',
}

export async function mainConfig() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(json({ limit: requestLimitStringMB }));
  app.use(urlencoded({ extended: true, limit: requestLimitStringMB }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(process.env.PORT || port);
}