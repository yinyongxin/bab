import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BaseMongooseModule } from '../mongo';
import BaseModuleList from './base';
import ProjectsModuleList from './projects';
import { LoggerMiddleware } from 'src/middlewares';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      exclude: ['/api/*'],
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
    BaseMongooseModule,
    ...BaseModuleList,
    ...ProjectsModuleList,
  ],
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
