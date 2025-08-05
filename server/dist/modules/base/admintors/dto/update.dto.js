"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmintorsUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
class AdmintorsUpdateDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(base_1.Admintors, [
    'password',
    'createdTime',
    'deletedTime',
    'updatedTime',
])) {
}
exports.AdmintorsUpdateDto = AdmintorsUpdateDto;
//# sourceMappingURL=update.dto.js.map