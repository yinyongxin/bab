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
exports.DepartmentsMongooseModule = exports.DepartmentsSchema = exports.Departments = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const global_1 = require("../../global");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../enums");
let Departments = class Departments extends global_1.BaseDocument {
};
exports.Departments = Departments;
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 20,
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '部门名称',
        example: 'departmentName',
    }),
    __metadata("design:type", String)
], Departments.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: '',
        maxlength: 1000,
    }),
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '部门名称',
        example: '我是部门描述',
    }),
    __metadata("design:type", String)
], Departments.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    (0, swagger_1.ApiProperty)({ required: true, description: '用作部门排序', example: 0 }),
    __metadata("design:type", Number)
], Departments.prototype, "sort", void 0);
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
], Departments.prototype, "icon", void 0);
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
], Departments.prototype, "parent", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: enums_1.StatusEnum.OPEN,
        required: true,
        enum: enums_1.StatusEnum,
    }),
    (0, swagger_1.ApiProperty)({
        description: '状态',
        example: enums_1.StatusEnum.OPEN,
        enum: enums_1.StatusEnum,
        enumName: 'StatusEnum',
    }),
    __metadata("design:type", String)
], Departments.prototype, "status", void 0);
exports.Departments = Departments = __decorate([
    (0, mongoose_1.Schema)()
], Departments);
exports.DepartmentsSchema = mongoose_1.SchemaFactory.createForClass(Departments);
exports.DepartmentsSchema.set('toJSON', {
    getters: true,
});
exports.DepartmentsMongooseModule = mongoose_1.MongooseModule.forFeature([
    {
        name: Departments.name,
        schema: exports.DepartmentsSchema,
    },
]);
//# sourceMappingURL=index.js.map