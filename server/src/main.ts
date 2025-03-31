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
  app.setGlobalPrefix('api'); // 设置全局前缀为 'api'

  initSwagger(app);

  const port = 3000;
  await app.listen(port);

  // 获取并打印IP地址
  const ipAddress = await getLocalExternalIP();
  console.log(`Application is running on: http://${ipAddress}:${port}`);
  console.log(`Application is running on: http://localhost:${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
