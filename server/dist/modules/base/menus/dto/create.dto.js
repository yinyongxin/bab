"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusCreateBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
class MenusCreateBodyDto extends (0, swagger_1.OmitType)(base_1.Menus, [
    'deletedTime',
    'createdTime',
    'updatedTime',
]) {
}
exports.MenusCreateBodyDto = MenusCreateBodyDto;
//# sourceMappingURL=create.dto.js.map