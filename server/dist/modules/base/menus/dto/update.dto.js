"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
class MenusUpdateDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(base_1.Menus, ['deletedTime', 'createdTime', 'deletedTime'])) {
}
exports.MenusUpdateDto = MenusUpdateDto;
//# sourceMappingURL=update.dto.js.map