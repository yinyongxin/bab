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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_1 = require("../../../mongo/base");
const tools_1 = require("../../../mongo/tools");
let DepartmentsService = class DepartmentsService {
    constructor(departmentsModel) {
        this.departmentsModel = departmentsModel;
    }
    async addOne(data) {
        const createdDepartment = new this.departmentsModel(data);
        const res = await createdDepartment.save();
        return res;
    }
    async findById(id) {
        const res = this.departmentsModel.findById(id, {
            password: false,
        });
        return res;
    }
    async deleteByIds(ids) {
        const res = await (0, tools_1.deleteByIds)(this.departmentsModel, ids);
        return res;
    }
    async updateOne(id, data) {
        const res = await this.departmentsModel
            .updateOne({ _id: id }, {
            ...data,
            $currentDate: {
                updatedTime: true,
            },
        })
            .exec();
        return res;
    }
    async getTreeData() {
        const dataList = await this.departmentsModel.find().exec();
        const menuMap = new Map();
        dataList.forEach((menuItem) => {
            menuMap.set(menuItem.id, menuItem);
        });
        const getTree = (parentId) => {
            return Array.from(menuMap.values())
                .filter((menuItem) => menuItem.parent === parentId)
                .map((menuItem) => ({
                ...menuItem.toObject(),
                children: getTree(menuItem._id.toString()),
            }));
        };
        return getTree('');
    }
    getAllByFilter(filter) {
        return this.departmentsModel
            .find(filter)
            .sort({
            sort: 1,
        })
            .exec();
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(base_1.Departments.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map