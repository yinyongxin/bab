import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules';
import { initSwagger } from './plugins/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
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

  const port = 3000;
  const server = await app.listen(port);

  // 获取并打印IP地址
  const ipAddress = await getLocalExternalIP();
  console.log(`Application is running on: http://${ipAddress}:${port}/api`);
  console.log(`Application is running on: http://localhost:${port}/api`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
