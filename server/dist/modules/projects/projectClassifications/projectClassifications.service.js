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
exports.ProjectClassificationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const projectClassifications_1 = require("../../../mongo/projects/projectClassifications");
const tools_1 = require("../../../mongo/tools");
let ProjectClassificationsService = class ProjectClassificationsService {
    constructor(projectClassificationsModel) {
        this.projectClassificationsModel = projectClassificationsModel;
    }
    async addOne(data) {
        const createdMenu = new this.projectClassificationsModel(data);
        const res = await createdMenu.save();
        return res;
    }
    async findById(id) {
        const res = this.projectClassificationsModel.findById(id, {
            password: false,
        });
        return res;
    }
    async deleteByIds(idsToUpdate) {
        const res = await (0, tools_1.deleteByIds)(this.projectClassificationsModel, idsToUpdate);
        return res;
    }
    async updateOne(id, data) {
        const res = await this.projectClassificationsModel
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
        const dataList = await this.projectClassificationsModel.find().exec();
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
        return this.projectClassificationsModel
            .find(filter)
            .sort({
            sort: 1,
        })
            .exec();
    }
};
exports.ProjectClassificationsService = ProjectClassificationsService;
exports.ProjectClassificationsService = ProjectClassificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(projectClassifications_1.ProjectClassifications.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectClassificationsService);
//# sourceMappingURL=projectClassifications.service.js.map