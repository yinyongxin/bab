import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules.ts/app/app.module';
import { initSwagger } from './plugins/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  initSwagger(app);
  await app.listen(3000);
}

bootstrap();
