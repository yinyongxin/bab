"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../utils");
const initSwagger = async (app) => {
    const config = new swagger_1.DocumentBuilder();
    config.setTitle('BAB服务器接口');
    config.setDescription('BAB服务器接口');
    config.setVersion('1.0.0');
    config.addBearerAuth({
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
    }, 'Authorization');
    const ipAddress = await (0, utils_1.getLocalExternalIP)();
    config.setExternalDoc('下载JSON文件请点击', `http://${ipAddress}:3000/api-json`);
    const document = swagger_1.SwaggerModule.createDocument(app, config.build());
    swagger_1.SwaggerModule.setup('/api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: 'BAB接口',
    });
};
exports.initSwagger = initSwagger;
//# sourceMappingURL=index.js.map