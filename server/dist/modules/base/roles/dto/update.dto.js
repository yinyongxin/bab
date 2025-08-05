"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
class RolesUpdateDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(base_1.Roles, ['deletedTime', 'createdTime', 'deletedTime'])) {
}
exports.RolesUpdateDto = RolesUpdateDto;
//# sourceMappingURL=update.dto.js.map