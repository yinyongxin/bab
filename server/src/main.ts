import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import { initSwagger } from './plugins/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import middlewares from './middlewares';
import { getLocalExternalIP } from './utils';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    /**
     * 开启跨域
     * https://docs.nestjs.com/security/cors
     */
    cors: true,
  });

  initSwagger(app);

  middlewares.forEach((middleware) => {
    app.use(middleware);
  });

  const port = 3000;
  const server = await app.listen(port);

  // 获取并打印IP地址
  const ipAddress = await getLocalExternalIP();
  console.log(`Application is running on: http://${ipAddress}:${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
