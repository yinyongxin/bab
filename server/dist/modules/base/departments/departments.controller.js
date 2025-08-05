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
exports.DepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const departments_service_1 = require("./departments.service");
const dto_1 = require("./dto");
const dtos_1 = require("../../../dtos");
let DepartmentsController = class DepartmentsController {
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    async addOne(body) {
        const res = await this.departmentsService.addOne(body);
        return res;
    }
    async deleteByIds(body) {
        const res = await this.departmentsService.deleteByIds(body.ids);
        return res;
    }
    async updateOne(query, body) {
        const res = await this.departmentsService.updateOne(query.id, body);
        return res;
    }
    async findById(query) {
        const res = await this.departmentsService.findById(query.id);
        return res;
    }
    async getTreeData() {
        const res = await this.departmentsService.getTreeData();
        return res;
    }
    async getAllByFilter(body) {
        const res = await this.departmentsService.getAllByFilter(body);
        return res;
    }
};
exports.DepartmentsController = DepartmentsController;
__decorate([
    (0, common_1.Put)('addOne'),
    (0, swagger_1.ApiOkResponse)({
        description: '添加部门成功',
        type: dto_1.DepartmentsResultDto,
    }),
    (0, swagger_1.ApiOperation)({
        description: '添加一个部门',
        summary: '添加一个部门',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DepartmentsCreateBodyDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "addOne", null);
__decorate([
    (0, common_1.Delete)('deleteByIds'),
    (0, swagger_1.ApiResponse)({
        description: '删除成功',
        type: (0, swagger_1.IntersectionType)(dtos_1.UpdateResDto, dtos_1.DeleteResDto),
    }),
    (0, swagger_1.ApiOperation)({
        description: '通过Ids删除部门',
        summary: '通过Id删除部门',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.DeleteIdsDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "deleteByIds", null);
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
    __metadata("design:paramtypes", [dtos_1.QueryIdDto, dto_1.DepartmentsUpdateDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Get)('findById'),
    (0, swagger_1.ApiOkResponse)({
        description: '查找成功',
        type: dto_1.DepartmentsResultDto,
    }),
    (0, swagger_1.ApiOperation)({
        description: '通过Id查找部门',
        summary: '通过Id查找部门',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryIdDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('getTreeData'),
    (0, swagger_1.ApiOkResponse)({
        description: '获取树形结构',
        type: [dto_1.TreeDepartmentsDataDto],
    }),
    (0, swagger_1.ApiOperation)({
        description: '获取树形结构',
        summary: '获取树形结构',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "getTreeData", null);
__decorate([
    (0, common_1.Post)('getAllByFilter'),
    (0, swagger_1.ApiOkResponse)({
        description: '获取所有部门',
        type: [dto_1.DepartmentsResultDto],
    }),
    (0, swagger_1.ApiOperation)({
        description: '获取所有部门',
        summary: '获取所有部门',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.DepartmentsQueryDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "getAllByFilter", null);
exports.DepartmentsController = DepartmentsController = __decorate([
    (0, swagger_1.ApiTags)('部门-Departments'),
    (0, common_1.Controller)('departments'),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
//# sourceMappingURL=departments.controller.js.map