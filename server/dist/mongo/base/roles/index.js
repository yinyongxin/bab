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
exports.RolesMongooseModule = exports.RolesSchema = exports.Roles = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const global_1 = require("../../global");
const swagger_1 = require("@nestjs/swagger");
let Roles = class Roles extends global_1.BaseDocument {
};
exports.Roles = Roles;
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: true,
        minlength: 1,
        maxlength: 20,
    }),
    (0, swagger_1.ApiProperty)({ required: true, description: '角色名称', example: 'role' }),
    __metadata("design:type", String)
], Roles.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: '',
        maxlength: 100000,
    }),
    (0, swagger_1.ApiProperty)({
        required: false,
        description: '角色名称',
        example: '我是角色描述',
    }),
    __metadata("design:type", String)
], Roles.prototype, "description", void 0);
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
], Roles.prototype, "icon", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: [],
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '菜单',
        example: [],
    }),
    __metadata("design:type", Array)
], Roles.prototype, "menus", void 0);
exports.Roles = Roles = __decorate([
    (0, mongoose_1.Schema)()
], Roles);
exports.RolesSchema = mongoose_1.SchemaFactory.createForClass(Roles);
exports.RolesSchema.set('toJSON', {
    getters: true,
});
exports.RolesMongooseModule = mongoose_1.MongooseModule.forFeature([
    {
        name: Roles.name,
        schema: exports.RolesSchema,
    },
]);
//# sourceMappingURL=index.js.map