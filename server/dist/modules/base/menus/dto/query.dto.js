"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
class MenusQueryDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(base_1.Menus, ['deletedTime'])) {
}
exports.MenusQueryDto = MenusQueryDto;
//# sourceMappingURL=query.dto.js.map