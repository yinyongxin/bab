"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmintorsModule = void 0;
const common_1 = require("@nestjs/common");
const base_1 = require("../../../mongo/base");
const admintors_controller_1 = require("./admintors.controller");
const admintors_service_1 = require("./admintors.service");
let AdmintorsModule = class AdmintorsModule {
};
exports.AdmintorsModule = AdmintorsModule;
exports.AdmintorsModule = AdmintorsModule = __decorate([
    (0, common_1.Module)({
        imports: [base_1.AdmintorsMongooseModule],
        controllers: [admintors_controller_1.AdmintorsController],
        providers: [
            admintors_service_1.AdmintorsService,
        ],
        exports: [admintors_service_1.AdmintorsService],
    })
], AdmintorsModule);
//# sourceMappingURL=admintors.module.js.map