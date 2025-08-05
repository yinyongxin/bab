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
exports.ProjectClassificationsMongooseModule = exports.ProjectClassificationsSchema = exports.ProjectClassifications = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const global_1 = require("../../global");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../enums");
let ProjectClassifications = class ProjectClassifications extends global_1.BaseDocument {
};
exports.ProjectClassifications = ProjectClassifications;
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 20,
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '分类名称',
        example: 'classificationName',
    }),
    __metadata("design:type", String)
], ProjectClassifications.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: '',
        maxlength: 10000,
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '分类名称',
        example: '我是分类描述',
    }),
    __metadata("design:type", String)
], ProjectClassifications.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    (0, swagger_1.ApiProperty)({ required: true, description: '用作分类排序', example: 0 }),
    __metadata("design:type", Number)
], ProjectClassifications.prototype, "sort", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: '',
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '分类图片',
        example: '',
    }),
    __metadata("design:type", String)
], ProjectClassifications.prototype, "picture", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: '',
    }),
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '图标',
        example: '',
    }),
    __metadata("design:type", String)
], ProjectClassifications.prototype, "parent", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: '',
        enum: enums_1.StatusEnum,
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '分类类型',
        example: enums_1.StatusEnum.OPEN,
        enum: enums_1.StatusEnum,
        enumName: 'StatusEnum',
    }),
    __metadata("design:type", String)
], ProjectClassifications.prototype, "status", void 0);
exports.ProjectClassifications = ProjectClassifications = __decorate([
    (0, mongoose_1.Schema)()
], ProjectClassifications);
exports.ProjectClassificationsSchema = mongoose_1.SchemaFactory.createForClass(ProjectClassifications);
exports.ProjectClassificationsSchema.set('toJSON', {
    getters: true,
});
exports.ProjectClassificationsMongooseModule = mongoose_1.MongooseModule.forFeature([
    {
        name: ProjectClassifications.name,
        schema: exports.ProjectClassificationsSchema,
    },
]);
//# sourceMappingURL=index.js.map