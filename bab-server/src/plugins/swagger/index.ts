import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export const initSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Sport')
    .setDescription('The Sport API description')
    .setVersion('1.0')
    // 设置接口请求验证token(要启用基本身份验证还需再每个Controller添加装饰器ApiBearerAuth)
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
      'Authorization',
    )
    .setExternalDoc('Download JSON Specifications', 'http://localhost:3000/api-json')
    .build()

  const document = SwaggerModule.createDocument(
    app,
    config
  );

  // Swaagger自定义设置
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      // 刷新页面不清楚认证信息
      persistAuthorization: true,
    },
    // 自定义PageTitle
    customSiteTitle: 'My API Docs',
  };

  SwaggerModule.setup('/api', app, document, customOptions);
};
