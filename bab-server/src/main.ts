import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/AppModule';
import { initSwagger } from './plugins/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  initSwagger(app);
  // 开启跨域
  app.enableCors();

  await app.listen(3000);
}





bootstrap();
