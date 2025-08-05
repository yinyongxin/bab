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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_service_1 = require("./roles.service");
const dto_1 = require("./dto");
const dtos_1 = require("../../../dtos");
const lodash_1 = require("lodash");
let RolesController = class RolesController {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async addOne(body) {
        const res = await this.rolesService.addOne(body);
        return res;
    }
    async deleteByIds(body) {
        const res = await this.rolesService.deleteByIds(body.ids);
        return res;
    }
    async updateOne(query, body) {
        const res = await this.rolesService.updateOne(query.id, body);
        return res;
    }
    async findById(query) {
        const res = await this.rolesService.findById(query.id);
        return res;
    }
    getPageList(pagination, body) {
        return this.rolesService.getPageList({
            pageNo: (0, lodash_1.toNumber)(pagination.pageNo),
            pageSize: (0, lodash_1.toNumber)(pagination.pageSize),
        }, body);
    }
    async getAll(body) {
        return this.rolesService.getAll(body);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Put)('addOne'),
    (0, swagger_1.ApiOkResponse)({
        description: '添加角色成功',
        type: dto_1.RolesResultDto,
    }),
    (0, swagger_1.ApiOperation)({
        description: '添加一个角色',
        summary: '添加一个角色',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RoleCreateBodyDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "addOne", null);
__decorate([
    (0, common_1.Delete)('deleteByIds'),
    (0, swagger_1.ApiResponse)({
        description: '删除成功',
        type: (0, swagger_1.IntersectionType)(dtos_1.UpdateResDto, dtos_1.DeleteResDto),
    }),
    (0, swagger_1.ApiOperation)({
        description: '通过Ids删除角色',
        summary: '通过Id删除角色',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.DeleteIdsDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "deleteByIds", null);
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
    __metadata("design:paramtypes", [dtos_1.QueryIdDto, dto_1.RolesUpdateDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Get)('findById'),
    (0, swagger_1.ApiOkResponse)({
        description: '查找成功',
        type: dto_1.RolesResultDto,
    }),
    (0, swagger_1.ApiOperation)({
        description: '通过Id查找角色',
        summary: '通过Id查找角色',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryIdDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('getPageList'),
    (0, swagger_1.ApiOkResponse)({
        description: '获取分页列表',
        type: dto_1.RoleQueryPaginationResultDto,
    }),
    (0, swagger_1.ApiOperation)({
        description: '获取分页列表',
        summary: '获取分页列表',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.PaginationDto,
        dto_1.RolesQueryFilterDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "getPageList", null);
__decorate([
    (0, common_1.Post)('getAll'),
    (0, swagger_1.ApiOkResponse)({
        description: '获取全部角色',
        type: [dto_1.RolesResultDto],
    }),
    (0, swagger_1.ApiOperation)({
        description: '获取全部角色',
        summary: '获取全部角色',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RolesQueryFilterDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getAll", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('角色-Roles'),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map