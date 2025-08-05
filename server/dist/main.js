"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const modules_1 = require("./modules");
const swagger_1 = require("./plugins/swagger");
const utils_1 = require("./utils");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(modules_1.AppModule, {
        cors: true,
        logger: new common_1.ConsoleLogger({
            prefix: 'MyApp',
        }),
    });
    app.setGlobalPrefix('api');
    (0, swagger_1.initSwagger)(app);
    const port = 3000;
    await app.listen(port);
    const ipAddress = await (0, utils_1.getLocalExternalIP)();
    console.log(`Application is running on: http://${ipAddress}:${port}`);
    console.log(`Application is running on: http://localhost:${port}`);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map