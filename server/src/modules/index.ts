import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BaseMongooseModule } from '../mongo';
import BaseModuleList from './base';
import { LoggerMiddleware } from 'src/middlewares';

@Module({
  imports: [BaseMongooseModule, ...BaseModuleList],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // 注册中间件
      .forRoutes('*'); // 可以指定路由，'*' 表示所有路由
  }
}
