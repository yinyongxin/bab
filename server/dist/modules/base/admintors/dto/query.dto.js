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
exports.AdmintorsFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
const dtos_1 = require("../../../../dtos");
class AdmintorsFilterFuzzyFieldsDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(base_1.Admintors, ['name', 'username', 'email'])) {
}
class AdmintorsFilterDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(base_1.Admintors, [
    'password',
    'deletedTime',
    'createdTime',
    'updatedTime',
    'name',
    'username',
    'email',
])) {
}
exports.AdmintorsFilterDto = AdmintorsFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '时间范围',
        type: dtos_1.DateTimeRangeDto,
    }),
    __metadata("design:type", dtos_1.DateTimeRangeDto)
], AdmintorsFilterDto.prototype, "dateTimeRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '模糊查询字段',
        type: AdmintorsFilterFuzzyFieldsDto,
    }),
    __metadata("design:type", Object)
], AdmintorsFilterDto.prototype, "fuzzyFields", void 0);
//# sourceMappingURL=query.dto.js.map