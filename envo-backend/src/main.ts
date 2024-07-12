import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Enable if you are using cookies, sessions, etc
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  await app.listen(3000);
}
bootstrap();
