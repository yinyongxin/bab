"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleCreateBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
class RoleCreateBodyDto extends (0, swagger_1.OmitType)(base_1.Roles, [
    'deletedTime',
    'createdTime',
    'updatedTime',
]) {
}
exports.RoleCreateBodyDto = RoleCreateBodyDto;
//# sourceMappingURL=create.dto.js.map