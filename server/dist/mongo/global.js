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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDocument = exports.BaseTimeDocument = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const dayjs_1 = __importDefault(require("dayjs"));
const common_1 = require("../common");
class BaseTimeDocument {
}
exports.BaseTimeDocument = BaseTimeDocument;
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: '',
        get: (time) => (time ? (0, dayjs_1.default)(time).format(common_1.FORMAT) : time),
    }),
    (0, swagger_1.ApiProperty)({
        type: Date,
        description: '删除时间',
        default: '',
        required: false,
    }),
    __metadata("design:type", Date)
], BaseTimeDocument.prototype, "deletedTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: Date.now,
        get: (time) => (0, dayjs_1.default)(time).format(common_1.FORMAT),
    }),
    (0, swagger_1.ApiProperty)({ type: Date, description: '创建日期', default: Date.now() }),
    __metadata("design:type", Date)
], BaseTimeDocument.prototype, "createdTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: Date.now,
        get: (time) => (0, dayjs_1.default)(time).format(common_1.FORMAT),
    }),
    (0, swagger_1.ApiProperty)({ type: Date, description: '更新日期', default: Date.now() }),
    __metadata("design:type", Date)
], BaseTimeDocument.prototype, "updatedTime", void 0);
class BaseDocument extends BaseTimeDocument {
}
exports.BaseDocument = BaseDocument;
//# sourceMappingURL=global.js.map