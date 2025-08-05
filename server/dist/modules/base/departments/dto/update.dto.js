"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
class DepartmentsUpdateDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(base_1.Departments, ['deletedTime', 'createdTime', 'deletedTime'])) {
}
exports.DepartmentsUpdateDto = DepartmentsUpdateDto;
//# sourceMappingURL=update.dto.js.map