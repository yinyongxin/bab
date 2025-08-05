"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsCreateBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
class DepartmentsCreateBodyDto extends (0, swagger_1.OmitType)(base_1.Departments, [
    'deletedTime',
    'createdTime',
    'updatedTime',
]) {
}
exports.DepartmentsCreateBodyDto = DepartmentsCreateBodyDto;
//# sourceMappingURL=create.dto.js.map