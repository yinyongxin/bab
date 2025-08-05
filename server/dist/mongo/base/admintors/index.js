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
exports.AdmintorsMongooseModule = exports.AdmintorsSchema = exports.Admintors = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const global_1 = require("../../global");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../enums");
const mongoose_2 = require("mongoose");
let Admintors = class Admintors extends global_1.BaseDocument {
};
exports.Admintors = Admintors;
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 20,
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '管理人员名称',
        example: 'admin',
    }),
    __metadata("design:type", String)
], Admintors.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    (0, swagger_1.ApiProperty)({ required: true, description: '密码', example: '123456' }),
    __metadata("design:type", String)
], Admintors.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: '',
    }),
    (0, swagger_1.ApiProperty)({ required: false, description: '头像', example: '' }),
    __metadata("design:type", String)
], Admintors.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: '',
    }),
    (0, swagger_1.ApiProperty)({ required: false, description: '姓名', example: '' }),
    __metadata("design:type", String)
], Admintors.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        isRequired: true,
        type: mongoose_2.Types.ObjectId,
        minlength: 1,
        set: (v) => v.map((item) => new mongoose_2.Types.ObjectId(item)),
    }),
    (0, swagger_1.ApiProperty)({ required: true, description: '角色', example: [] }),
    __metadata("design:type", Array)
], Admintors.prototype, "roles", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: enums_1.SexEnum.MALE,
        enum: enums_1.SexEnum,
    }),
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '性别',
        example: enums_1.SexEnum.MALE,
        enum: enums_1.SexEnum,
        enumName: 'SexEnum',
    }),
    __metadata("design:type", String)
], Admintors.prototype, "sex", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: '',
    }),
    (0, swagger_1.ApiProperty)({ required: false, description: '电话号码', example: '' }),
    __metadata("design:type", String)
], Admintors.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: '',
        unique: true,
    }),
    (0, swagger_1.ApiProperty)({ required: true, description: '邮箱', example: '' }),
    __metadata("design:type", String)
], Admintors.prototype, "email", void 0);
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
], Admintors.prototype, "status", void 0);
exports.Admintors = Admintors = __decorate([
    (0, mongoose_1.Schema)()
], Admintors);
exports.AdmintorsSchema = mongoose_1.SchemaFactory.createForClass(Admintors);
exports.AdmintorsSchema.set('toJSON', {
    getters: true,
});
exports.AdmintorsMongooseModule = mongoose_1.MongooseModule.forFeature([
    {
        name: Admintors.name,
        schema: exports.AdmintorsSchema,
    },
]);
//# sourceMappingURL=index.js.map