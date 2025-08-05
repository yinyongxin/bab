"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeDepartmentsDataDto = exports.DepartmentsResultDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
const dtos_1 = require("../../../../dtos");
class DepartmentsResultDto extends (0, swagger_1.IntersectionType)((0, swagger_1.OmitType)(base_1.Departments, ['deletedTime']), dtos_1.Result_idDto) {
}
exports.DepartmentsResultDto = DepartmentsResultDto;
class TreeDepartmentsDataDto extends (0, swagger_1.IntersectionType)(base_1.Departments, dtos_1.Result_idDto) {
}
exports.TreeDepartmentsDataDto = TreeDepartmentsDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '唯一值',
        type: [TreeDepartmentsDataDto],
        examples: [],
    }),
    __metadata("design:type", Array)
], TreeDepartmentsDataDto.prototype, "children", void 0);
//# sourceMappingURL=result.dto.js.map