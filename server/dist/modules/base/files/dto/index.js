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
exports.FilesBatchDeleteDto = exports.FilesPaginationResultDto = exports.FilesQueryFilterDto = exports.FilesUploadSuccessResultDto = exports.FilesUploadDto = exports.FileUploadSuccessResultDto = exports.FileUpdateDto = exports.FileUploadDto = exports.FilesResultDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../../../../dtos");
const dtos_2 = require("../../../../dtos");
const files_1 = require("../../../../mongo/base/files");
class FilesResultDto extends (0, swagger_1.IntersectionType)((0, swagger_1.OmitType)(files_1.Files, ['deletedTime']), dtos_1.Result_idDto) {
}
exports.FilesResultDto = FilesResultDto;
class FileUploadDto {
}
exports.FileUploadDto = FileUploadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], FileUploadDto.prototype, "file", void 0);
class FileInfo extends (0, swagger_1.PickType)(FilesResultDto, ['path', '_id']) {
}
class FileUpdateDto {
}
exports.FileUpdateDto = FileUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], FileUpdateDto.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: FileInfo,
        format: 'binary',
    }),
    __metadata("design:type", Object)
], FileUpdateDto.prototype, "fileInfo", void 0);
class FileUploadSuccessResultDto {
}
exports.FileUploadSuccessResultDto = FileUploadSuccessResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '图片地址',
    }),
    __metadata("design:type", String)
], FileUploadSuccessResultDto.prototype, "url", void 0);
class FilesUploadDto {
}
exports.FilesUploadDto = FilesUploadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'array', items: { type: 'string', format: 'binary' } }),
    __metadata("design:type", Array)
], FilesUploadDto.prototype, "files", void 0);
class FilesUploadSuccessResultDto {
}
exports.FilesUploadSuccessResultDto = FilesUploadSuccessResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '图片地址',
    }),
    __metadata("design:type", Array)
], FilesUploadSuccessResultDto.prototype, "urls", void 0);
class FilesQueryFilterDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(files_1.Files, [
    'deletedTime',
    'createdTime',
    'updatedTime',
    'originalname',
    'uniquedName',
])) {
}
exports.FilesQueryFilterDto = FilesQueryFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '时间范围',
        type: dtos_2.DateTimeRangeDto,
    }),
    __metadata("design:type", dtos_2.DateTimeRangeDto)
], FilesQueryFilterDto.prototype, "dateTimeRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '模糊查询字段',
        type: (0, swagger_1.PickType)(files_1.Files, ['originalname', 'uniquedName']),
    }),
    __metadata("design:type", Object)
], FilesQueryFilterDto.prototype, "fuzzyFields", void 0);
class FilesPaginationResultDto extends dtos_1.PaginationResultDto {
}
exports.FilesPaginationResultDto = FilesPaginationResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '所有数量',
        type: [FilesResultDto],
    }),
    __metadata("design:type", Array)
], FilesPaginationResultDto.prototype, "list", void 0);
class FilesBatchDeleteDto {
}
exports.FilesBatchDeleteDto = FilesBatchDeleteDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '文件列表',
        type: [FilesResultDto],
    }),
    __metadata("design:type", Array)
], FilesBatchDeleteDto.prototype, "fileList", void 0);
//# sourceMappingURL=index.js.map