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
exports.DateTimeRangeDto = exports.ErrorResultDto = exports.PaginationResultDto = exports.PaginationDto = exports.DeleteResDto = exports.UpdateResDto = exports.DeleteIdsDto = exports.Result_idDto = exports.Document_idDto = exports.QueryIdDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
class QueryIdDto {
}
exports.QueryIdDto = QueryIdDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '唯一值',
    }),
    __metadata("design:type", String)
], QueryIdDto.prototype, "id", void 0);
class Document_idDto {
}
exports.Document_idDto = Document_idDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '唯一值',
        type: mongoose_1.Types.ObjectId,
    }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Document_idDto.prototype, "_id", void 0);
class Result_idDto {
}
exports.Result_idDto = Result_idDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '唯一值',
    }),
    __metadata("design:type", String)
], Result_idDto.prototype, "_id", void 0);
class DeleteIdsDto {
}
exports.DeleteIdsDto = DeleteIdsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '删除Id列表',
    }),
    __metadata("design:type", Array)
], DeleteIdsDto.prototype, "ids", void 0);
class UpdateResDto {
}
exports.UpdateResDto = UpdateResDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '是否成功',
    }),
    __metadata("design:type", Boolean)
], UpdateResDto.prototype, "acknowledged", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '更新数量',
    }),
    __metadata("design:type", Number)
], UpdateResDto.prototype, "modifiedCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '更新插入id',
    }),
    __metadata("design:type", String)
], UpdateResDto.prototype, "upsertedId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '更新插入数量',
    }),
    __metadata("design:type", Number)
], UpdateResDto.prototype, "upsertedCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '符合更新条件的数量',
    }),
    __metadata("design:type", Number)
], UpdateResDto.prototype, "matchedCount", void 0);
class DeleteResDto {
}
exports.DeleteResDto = DeleteResDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '是否成功',
    }),
    __metadata("design:type", Boolean)
], DeleteResDto.prototype, "acknowledged", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '匹配数量',
    }),
    __metadata("design:type", Number)
], DeleteResDto.prototype, "deletedCount", void 0);
class PaginationDto {
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '当前页面',
        minimum: 1,
        example: 1,
    }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "pageNo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '分页大小',
        minimum: 1,
        example: 10,
    }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "pageSize", void 0);
class PaginationResultDto extends PaginationDto {
}
exports.PaginationResultDto = PaginationResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '所有数量',
        example: 1,
    }),
    __metadata("design:type", Number)
], PaginationResultDto.prototype, "total", void 0);
class ErrorResultDto {
}
exports.ErrorResultDto = ErrorResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '错误信息',
    }),
    __metadata("design:type", String)
], ErrorResultDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '错误码',
    }),
    __metadata("design:type", Number)
], ErrorResultDto.prototype, "statusCode", void 0);
class DateTimeRangeDto {
}
exports.DateTimeRangeDto = DateTimeRangeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '创建时间范围',
        type: 'array',
        readOnly: true,
        minLength: 2,
        maxLength: 2,
        items: {
            readOnly: true,
            type: 'string',
            format: 'date-time',
        },
    }),
    __metadata("design:type", Array)
], DateTimeRangeDto.prototype, "createdTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '更新时间范围',
        type: 'array',
        readOnly: true,
        minLength: 2,
        maxLength: 2,
        items: {
            readOnly: true,
            type: 'string',
            format: 'date-time',
        },
    }),
    __metadata("design:type", Array)
], DateTimeRangeDto.prototype, "updatedTime", void 0);
//# sourceMappingURL=index.js.map