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
exports.ProjectClassificationsTreeDto = exports.ProjectClassificationsResultDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const projectClassifications_1 = require("../../../../mongo/projects/projectClassifications");
const dtos_1 = require("../../../../dtos");
class ProjectClassificationsResultDto extends (0, swagger_1.IntersectionType)((0, swagger_1.OmitType)(projectClassifications_1.ProjectClassifications, ['deletedTime']), dtos_1.Result_idDto) {
}
exports.ProjectClassificationsResultDto = ProjectClassificationsResultDto;
class ProjectClassificationsTreeDto extends (0, swagger_1.IntersectionType)(projectClassifications_1.ProjectClassifications, dtos_1.Result_idDto) {
}
exports.ProjectClassificationsTreeDto = ProjectClassificationsTreeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '唯一值',
        type: [ProjectClassificationsTreeDto],
        examples: [],
    }),
    __metadata("design:type", Array)
], ProjectClassificationsTreeDto.prototype, "children", void 0);
//# sourceMappingURL=result.dto.js.map