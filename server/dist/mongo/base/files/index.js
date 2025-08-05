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
exports.FilesMongooseModule = exports.FilesSchema = exports.Files = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const global_1 = require("../../global");
const swagger_1 = require("@nestjs/swagger");
let Files = class Files extends global_1.BaseDocument {
};
exports.Files = Files;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 1,
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '原始文件名',
        example: 'image/jpeg',
    }),
    __metadata("design:type", String)
], Files.prototype, "originalname", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: true,
        minlength: 1,
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '唯一文件名',
        example: 'uniqueName',
    }),
    __metadata("design:type", String)
], Files.prototype, "uniquedName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 1,
    }),
    (0, swagger_1.ApiProperty)({ required: true, description: '文件类型', example: 'fileName' }),
    __metadata("design:type", String)
], Files.prototype, "mimetype", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 1,
    }),
    (0, swagger_1.ApiProperty)({ required: true, description: '文件大小', example: 1024 }),
    __metadata("design:type", Number)
], Files.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        minlength: 1,
    }),
    (0, swagger_1.ApiProperty)({
        required: true,
        description: '文件路径',
        example: '/file/fileName.png',
    }),
    __metadata("design:type", String)
], Files.prototype, "path", void 0);
exports.Files = Files = __decorate([
    (0, mongoose_1.Schema)()
], Files);
exports.FilesSchema = mongoose_1.SchemaFactory.createForClass(Files);
exports.FilesSchema.set('toJSON', {
    getters: true,
});
exports.FilesMongooseModule = mongoose_1.MongooseModule.forFeature([
    {
        name: Files.name,
        schema: exports.FilesSchema,
    },
]);
//# sourceMappingURL=index.js.map