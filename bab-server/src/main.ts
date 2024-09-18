import { NestFactory } from '@nestjs/core';
import { EnterModule } from './modules';
import { initSwagger } from './plugins/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import middlewares from './middlewares';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(EnterModule);
  initSwagger(app);
  // 开启跨域
  app.enableCors();
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });

  await app.listen(3000);
}

bootstrap();
