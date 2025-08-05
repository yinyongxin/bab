"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesQueryFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
class RolesQueryFilterDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(base_1.Roles, ['deletedTime'])) {
}
exports.RolesQueryFilterDto = RolesQueryFilterDto;
//# sourceMappingURL=query.dto.js.map