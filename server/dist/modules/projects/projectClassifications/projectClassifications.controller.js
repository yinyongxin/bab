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
exports.ProjectClassificationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const projectClassifications_service_1 = require("./projectClassifications.service");
const dto_1 = require("./dto");
const dtos_1 = require("../../../dtos");
let ProjectClassificationsController = class ProjectClassificationsController {
    constructor(projectClassificationsService) {
        this.projectClassificationsService = projectClassificationsService;
    }
    async addOne(body) {
        const res = await this.projectClassificationsService.addOne(body);
        return res;
    }
    async deleteByIds(body) {
        const res = await this.projectClassificationsService.deleteByIds(body.ids);
        return res;
    }
    async updateOne(query, body) {
        const res = await this.projectClassificationsService.updateOne(query.id, body);
        return res;
    }
    async findById(query) {
        const res = await this.projectClassificationsService.findById(query.id);
        return res;
    }
    async getTreeData() {
        const res = await this.projectClassificationsService.getTreeData();
        return res;
    }
    async getAllByFilter(body) {
        const res = await this.projectClassificationsService.getAllByFilter(body);
        return res;
    }
};
exports.ProjectClassificationsController = ProjectClassificationsController;
__decorate([
    (0, common_1.Put)('addOne'),
    (0, swagger_1.ApiOkResponse)({
        description: '添加产品分类成功',
        type: dto_1.ProjectClassificationsResultDto,
    }),
    (0, swagger_1.ApiOperation)({
        description: '添加一个产品分类',
        summary: '添加一个产品分类',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ProjectClassificationsCreateBodyDto]),
    __metadata("design:returntype", Promise)
], ProjectClassificationsController.prototype, "addOne", null);
__decorate([
    (0, common_1.Delete)('deleteByIds'),
    (0, swagger_1.ApiResponse)({
        description: '删除成功',
        type: (0, swagger_1.IntersectionType)(dtos_1.UpdateResDto, dtos_1.DeleteResDto),
    }),
    (0, swagger_1.ApiOperation)({
        description: '通过Ids删除产品分类',
        summary: '通过Id删除产品分类',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.DeleteIdsDto]),
    __metadata("design:returntype", Promise)
], ProjectClassificationsController.prototype, "deleteByIds", null);
__decorate([
    (0, common_1.Patch)('updateOne'),
    (0, swagger_1.ApiResponse)({
        description: '更新结果',
        type: dtos_1.UpdateResDto,
    }),
    (0, swagger_1.ApiOperation)({
        description: '更新单条数据',
        summary: '更新单条数据',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryIdDto,
        dto_1.ProjectClassificationsUpdateDto]),
    __metadata("design:returntype", Promise)
], ProjectClassificationsController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Get)('findById'),
    (0, swagger_1.ApiOkResponse)({
        description: '查找成功',
        type: dto_1.ProjectClassificationsResultDto,
    }),
    (0, swagger_1.ApiOperation)({
        description: '通过Id查找产品分类',
        summary: '通过Id查找产品分类',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryIdDto]),
    __metadata("design:returntype", Promise)
], ProjectClassificationsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('getTreeData'),
    (0, swagger_1.ApiOkResponse)({
        description: '获取树形结构',
        type: [dto_1.ProjectClassificationsTreeDto],
    }),
    (0, swagger_1.ApiOperation)({
        description: '获取树形结构',
        summary: '获取树形结构',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectClassificationsController.prototype, "getTreeData", null);
__decorate([
    (0, common_1.Post)('getAllByFilter'),
    (0, swagger_1.ApiOkResponse)({
        description: '获取所有产品分类',
        type: [dto_1.ProjectClassificationsResultDto],
    }),
    (0, swagger_1.ApiOperation)({
        description: '获取所有产品分类',
        summary: '获取所有产品分类',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ProjectClassificationsQueryDto]),
    __metadata("design:returntype", Promise)
], ProjectClassificationsController.prototype, "getAllByFilter", null);
exports.ProjectClassificationsController = ProjectClassificationsController = __decorate([
    (0, swagger_1.ApiTags)('产品分类-ProjectClassifications'),
    (0, common_1.Controller)('projectClassifications'),
    __metadata("design:paramtypes", [projectClassifications_service_1.ProjectClassificationsService])
], ProjectClassificationsController);
//# sourceMappingURL=projectClassifications.controller.js.map