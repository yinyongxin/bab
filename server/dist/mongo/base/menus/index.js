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
exports.MenusMongooseModule = exports.MenusSchema = exports.Menus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const global_1 = require("../../global");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../enums");
let Menus = class Menus extends global_1.BaseDocument {
};
exports.Menus = Menus;
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 20,
    }),
    (0, swagger_1.ApiProperty)({ required: true, description: '菜单名称', example: 'menuName' }),
    __metadata("design:type", String)
], Menus.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: '',
        maxlength: 1000,
    }),
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '菜单名称',
        example: '我是菜单描述',
    }),
    __metadata("design:type", String)
], Menus.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: true,
        default: '',
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '菜单路径&功能区域标识',
        example: '',
    }),
    __metadata("design:type", String)
], Menus.prototype, "path", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 0,
    }),
    (0, swagger_1.ApiProperty)({ required: true, description: '用作菜单排序', example: 0 }),
    __metadata("design:type", Number)
], Menus.prototype, "sort", void 0);
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
], Menus.prototype, "icon", void 0);
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
], Menus.prototype, "parent", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: '',
        enum: enums_1.MenuTypeEnum,
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '菜单类型',
        example: enums_1.MenuTypeEnum.DIRECTORY,
        enum: enums_1.MenuTypeEnum,
        enumName: 'MenuTypeEnum',
    }),
    __metadata("design:type", String)
], Menus.prototype, "menuType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: false,
        type: Boolean,
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '是否隐藏',
    }),
    __metadata("design:type", Boolean)
], Menus.prototype, "isHide", void 0);
exports.Menus = Menus = __decorate([
    (0, mongoose_1.Schema)()
], Menus);
exports.MenusSchema = mongoose_1.SchemaFactory.createForClass(Menus);
exports.MenusSchema.set('toJSON', {
    getters: true,
});
exports.MenusMongooseModule = mongoose_1.MongooseModule.forFeature([
    {
        name: Menus.name,
        schema: exports.MenusSchema,
    },
]);
//# sourceMappingURL=index.js.map