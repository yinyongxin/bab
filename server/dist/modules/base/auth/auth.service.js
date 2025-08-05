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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const admintors_service_1 = require("../admintors/admintors.service");
const jwt_1 = require("@nestjs/jwt");
const roles_1 = require("../roles");
const lodash_1 = require("lodash");
const enums_1 = require("../../../enums");
let AuthService = class AuthService {
    constructor(admintorsService, rolesService, jwtService) {
        this.admintorsService = admintorsService;
        this.rolesService = rolesService;
        this.jwtService = jwtService;
    }
    async signIn(signInDto) {
        const { email, username, password } = signInDto;
        const user = await this.admintorsService.findOneByFilter({
            username,
            email,
        });
        const roleList = await Promise.all(user.roles.map(async (roleId) => {
            const menus = await this.rolesService.findById(roleId.toString());
            return menus;
        }));
        if (user?.password !== password) {
            throw new common_1.BadRequestException({
                message: '用户名或密码错误',
            });
        }
        if (user?.status === enums_1.StatusEnum.CLOSE) {
            throw new common_1.BadRequestException({
                message: '用户已被禁用',
            });
        }
        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            userInfo: user,
            menus: (0, lodash_1.uniq)(roleList.map((item) => item.menus).flat()),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admintors_service_1.AdmintorsService,
        roles_1.RolesService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map