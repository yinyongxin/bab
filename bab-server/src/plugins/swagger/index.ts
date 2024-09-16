import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
export const initSwagger = (app: NestExpressApplication) => {
  const config = new DocumentBuilder();
  config.setTitle('BAB服务器接口');
  config.setDescription('BAB服务器接口');
  config.setVersion('1.0.0');

  // 设置接口请求验证token(要启用基本身份验证还需再每个Controller添加装饰器ApiBearerAuth)
  config.addBearerAuth(
    {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
    'Authorization',
  );

  config.setExternalDoc('下载JSON文件请点击', 'http://localhost:3000/api-json');

  const document = SwaggerModule.createDocument(app, config.build());

  // Swaagger自定义设置
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      // 刷新页面不清楚认证信息
      persistAuthorization: true,
    },
    // 自定义PageTitle
    customSiteTitle: 'BAB接口',
  };

  SwaggerModule.setup('/api', app, document, customOptions);
};
