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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_1 = require("../../../mongo/base");
const tools_1 = require("../../../mongo/tools");
const tools_2 = require("../../../mongo/tools");
let RolesService = class RolesService {
    constructor(rolesModel) {
        this.rolesModel = rolesModel;
    }
    async addOne(data) {
        const session = await this.rolesModel.startSession();
        try {
            session.startTransaction();
            const createdRole = new this.rolesModel(data);
            const res = await createdRole.save({
                session,
            });
            await session.commitTransaction();
            return res;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    async findById(id) {
        const res = this.rolesModel.findById(id, {
            password: false,
        });
        return res;
    }
    async deleteByIds(ids) {
        const res = await (0, tools_2.deleteByIds)(this.rolesModel, ids);
        return res;
    }
    async updateOne(id, data) {
        const res = await this.rolesModel
            .updateOne({ _id: id }, {
            ...data,
            $currentDate: {
                updatedTime: true,
            },
        })
            .exec();
        return res;
    }
    async getPageList(pagination, filter) {
        const [res] = await this.rolesModel.aggregate([
            { $match: (0, tools_1.toFuzzyParams)(filter) },
            { $sort: { createdTime: -1 } },
            {
                $facet: {
                    metadata: [{ $count: 'total' }],
                    list: [
                        { $skip: pagination.pageSize * (pagination.pageNo - 1) },
                        { $limit: pagination.pageSize },
                    ],
                },
            },
            {
                $project: {
                    total: { $arrayElemAt: ['$metadata.total', 0] },
                    list: 1,
                },
            },
        ]);
        return {
            total: res ? res.total || 0 : 0,
            list: res ? res.list : [],
            pageNo: pagination.pageNo,
            pageSize: pagination.pageSize,
        };
    }
    getAll(filter) {
        return this.rolesModel.find(filter, {});
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(base_1.Roles.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RolesService);
//# sourceMappingURL=roles.service.js.map