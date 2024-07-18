import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Enable if you are using cookies, sessions, etc
  });
  app.use(
    bodyParser.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf;
      },
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  await app.listen(3000);
}
bootstrap();
