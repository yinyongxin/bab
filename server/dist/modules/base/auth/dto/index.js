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
exports.LoginSuccessResultDto = exports.SignInDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../../../../mongo/base");
const admintors_1 = require("../../admintors");
class SignInDto extends (0, swagger_1.PickType)(base_1.Admintors, [
    'password',
    'username',
    'email',
]) {
}
exports.SignInDto = SignInDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin',
        required: false,
    }),
    __metadata("design:type", String)
], SignInDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin@email.com',
        required: false,
    }),
    __metadata("design:type", String)
], SignInDto.prototype, "email", void 0);
class LoginSuccessResultDto {
}
exports.LoginSuccessResultDto = LoginSuccessResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'token123456',
    }),
    __metadata("design:type", String)
], LoginSuccessResultDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            createdTime: '1743413281187',
            updatedTime: '1743413281187',
            username: 'admin',
            avatar: '',
            name: '',
            roles: [],
            sex: 'Male',
            phone: '',
            email: '',
            status: 'Open',
            _id: 'string',
        },
        type: admintors_1.AdmintorsResultDto,
    }),
    __metadata("design:type", admintors_1.AdmintorsResultDto)
], LoginSuccessResultDto.prototype, "userInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [],
    }),
    __metadata("design:type", Array)
], LoginSuccessResultDto.prototype, "menus", void 0);
//# sourceMappingURL=index.js.map