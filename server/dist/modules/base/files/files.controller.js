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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const files_service_1 = require("./files.service");
const platform_express_1 = require("@nestjs/platform-express");
const dto_1 = require("./dto");
const lodash_1 = require("lodash");
const dtos_1 = require("../../../dtos");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    uploadFile(file) {
        return this.filesService.uploadFile(file);
    }
    uploadFiles(files) {
        console.log(files);
    }
    async getPaginationList(pagination, body) {
        const res = await this.filesService.getPaginationList({
            pageNo: (0, lodash_1.toNumber)(pagination.pageNo),
            pageSize: (0, lodash_1.toNumber)(pagination.pageSize),
        }, body);
        return res;
    }
    async batchDelete(body) {
        const res = await this.filesService.batchDelete(body);
        return res;
    }
    updateFile(file, fileInfo) {
        this.filesService.updateFile(file, JSON.parse(fileInfo));
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Post)('uploadFile'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: '单文件上传',
        type: dto_1.FileUploadDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '单文件上传成功后返回',
        type: dto_1.FileUploadSuccessResultDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('uploadFiles'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: '多文件上传',
        type: dto_1.FilesUploadDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Post)('getPaginationList'),
    (0, swagger_1.ApiOkResponse)({
        description: '获取分页列表',
        type: dto_1.FilesPaginationResultDto,
    }),
    (0, swagger_1.ApiOperation)({
        description: '获取分页列表',
        summary: '获取分页列表',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.PaginationDto,
        dto_1.FilesQueryFilterDto]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "getPaginationList", null);
__decorate([
    (0, common_1.Delete)('batchDelete'),
    (0, swagger_1.ApiOperation)({
        description: '批量删除文件',
        summary: '批量删除文件',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '删除成功',
        type: (0, swagger_1.IntersectionType)(dtos_1.UpdateResDto, dtos_1.DeleteResDto),
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilesBatchDeleteDto]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "batchDelete", null);
__decorate([
    (0, common_1.Patch)('update'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: '单文件上传',
        type: dto_1.FileUpdateDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '更新成功后返回',
        type: dto_1.FileUploadSuccessResultDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('fileInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "updateFile", null);
exports.FilesController = FilesController = __decorate([
    (0, swagger_1.ApiTags)('文件-Files'),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '失败',
        type: dtos_1.ErrorResultDto,
    }),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map