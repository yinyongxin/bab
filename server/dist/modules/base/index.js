"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const admintors_1 = require("./admintors");
const auth_module_1 = require("./auth/auth.module");
const roles_module_1 = require("./roles/roles.module");
const menus_module_1 = require("./menus/menus.module");
const files_module_1 = require("./files/files.module");
const departments_module_1 = require("./departments/departments.module");
__exportStar(require("./admintors/admintors.module"), exports);
__exportStar(require("./roles/roles.module"), exports);
__exportStar(require("./auth/auth.module"), exports);
__exportStar(require("./menus/menus.module"), exports);
__exportStar(require("./departments/departments.module"), exports);
exports.default = [
    auth_module_1.AuthModule,
    admintors_1.AdmintorsModule,
    roles_module_1.RolesModule,
    menus_module_1.MenusModule,
    files_module_1.FilesModule,
    departments_module_1.DepartmentsModule,
];
//# sourceMappingURL=index.js.map