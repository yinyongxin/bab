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
exports.RoleQueryPaginationResultDto = exports.RolesResultDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../../../../dtos");
const base_1 = require("../../../../mongo/base");
class RolesResultDto extends (0, swagger_1.OmitType)(base_1.Roles, ['deletedTime']) {
}
exports.RolesResultDto = RolesResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '唯一值',
        type: String,
    }),
    __metadata("design:type", Object)
], RolesResultDto.prototype, "_id", void 0);
class RoleQueryPaginationResultDto extends dtos_1.PaginationResultDto {
}
exports.RoleQueryPaginationResultDto = RoleQueryPaginationResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '所有数量',
        type: [RolesResultDto],
    }),
    __metadata("design:type", Array)
], RoleQueryPaginationResultDto.prototype, "list", void 0);
//# sourceMappingURL=result.dto.js.map