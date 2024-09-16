import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules.ts/app/app.module';
import { initSwagger } from './plugins/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app)
  await app.listen(3000);
}

bootstrap();
