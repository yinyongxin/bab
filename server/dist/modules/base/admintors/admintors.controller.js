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
exports.AdmintorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admintors_service_1 = require("./admintors.service");
const dto_1 = require("./dto");
const dtos_1 = require("../../../dtos");
const lodash_1 = require("lodash");
let AdmintorsController = class AdmintorsController {
    constructor(admintorsService) {
        this.admintorsService = admintorsService;
    }
    async addOne(body) {
        const res = await this.admintorsService.addOne(body);
        return res;
    }
    async deleteByIds(body) {
        const res = await this.admintorsService.deleteByIds(body.ids);
        return res;
    }
    async updateOne(query, body) {
        const res = await this.admintorsService.updateOne(query.id, body);
        return res;
    }
    async findById(query) {
        const res = await this.admintorsService.findById(query.id);
        return res;
    }
    async getPageList(pagination, body) {
        const res = await this.admintorsService.getPageList({
            pageNo: (0, lodash_1.toNumber)(pagination.pageNo),
            pageSize: (0, lodash_1.toNumber)(pagination.pageSize),
        }, body);
        return res;
    }
};
exports.AdmintorsController = AdmintorsController;
__decorate([
    (0, common_1.Put)('addOne'),
    (0, swagger_1.ApiOperation)({
        description: '添加一个管理人员',
        summary: '添加一个管理人员',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '添加管理人员成功',
        type: dto_1.AdmintorsResultDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AdmintorsCreateBodyDto]),
    __metadata("design:returntype", Promise)
], AdmintorsController.prototype, "addOne", null);
__decorate([
    (0, common_1.Delete)('deleteByIds'),
    (0, swagger_1.ApiOperation)({
        description: '通过Ids删除管理人员',
        summary: '通过Id删除管理人员',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '删除成功',
        type: (0, swagger_1.IntersectionType)(dtos_1.UpdateResDto, dtos_1.DeleteResDto),
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.DeleteIdsDto]),
    __metadata("design:returntype", Promise)
], AdmintorsController.prototype, "deleteByIds", null);
__decorate([
    (0, common_1.Patch)('updateOne'),
    (0, swagger_1.ApiOperation)({
        description: '更新单条数据',
        summary: '更新单条数据',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '更新结果',
        type: dtos_1.UpdateResDto,
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryIdDto,
        dto_1.AdmintorsUpdateDto]),
    __metadata("design:returntype", Promise)
], AdmintorsController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Get)('findById'),
    (0, swagger_1.ApiOperation)({
        description: '通过Id查找管理人员',
        summary: '通过Id查找管理人员',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '查找成功',
        type: dto_1.AdmintorsResultDto,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryIdDto]),
    __metadata("design:returntype", Promise)
], AdmintorsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('getPageList'),
    (0, swagger_1.ApiOperation)({
        description: '获取分页列表',
        summary: '获取分页列表',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '获取分页列表',
        type: dto_1.AdmintorPaginationResultDto,
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.PaginationDto,
        dto_1.AdmintorsFilterDto]),
    __metadata("design:returntype", Promise)
], AdmintorsController.prototype, "getPageList", null);
exports.AdmintorsController = AdmintorsController = __decorate([
    (0, swagger_1.ApiTags)('管理人员-Admintors'),
    (0, swagger_1.ApiBadRequestResponse)({
        description: '失败',
        type: dtos_1.ErrorResultDto,
    }),
    (0, common_1.Controller)('admintors'),
    __metadata("design:paramtypes", [admintors_service_1.AdmintorsService])
], AdmintorsController);
//# sourceMappingURL=admintors.controller.js.map