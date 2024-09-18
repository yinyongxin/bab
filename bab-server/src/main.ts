import { NestFactory } from '@nestjs/core';
import { EnterModule } from './modules';
import { initSwagger } from './plugins/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import middlewares from './middlewares';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(EnterModule, {
    // 开启跨域
    cors: true,
  });
  initSwagger(app);
  middlewares.forEach((middleware) => {
    app.use(middleware);
  });

  await app.listen(3000);
}

bootstrap();
