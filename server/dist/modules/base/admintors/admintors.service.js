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
exports.AdmintorsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_1 = require("../../../mongo/base");
const tools_1 = require("../../../mongo/tools");
let AdmintorsService = class AdmintorsService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async addOne(data) {
        const session = await this.userModel.startSession();
        try {
            session.startTransaction();
            const createdAdmintor = new this.userModel({
                ...data,
            });
            const res = await createdAdmintor.save({
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
        const res = this.userModel.findById(id, {
            password: false,
        });
        return res;
    }
    findOneByFilter(filter) {
        const filterRes = Object.fromEntries(Object.entries(filter).filter(([, value]) => value !== undefined));
        return this.userModel.findOne(filterRes);
    }
    async deleteByIds(idsToUpdate) {
        const res = await (0, tools_1.deleteByIds)(this.userModel, idsToUpdate);
        return res;
    }
    async updateOne(id, data) {
        const res = await this.userModel
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
        const { dateTimeRange, fuzzyFields, ...fields } = filter;
        const match = {
            ...fields,
            ...(0, tools_1.toFuzzyParams)(fuzzyFields),
            ...(0, tools_1.getDateTimeRange)(dateTimeRange),
        };
        const [res] = await this.userModel.aggregate([
            {
                $match: match,
            },
            { $sort: { createdTime: -1 } },
            {
                $facet: {
                    metadata: [{ $count: 'total' }],
                    list: [
                        { $skip: pagination.pageSize * (pagination.pageNo - 1) },
                        { $limit: pagination.pageSize },
                        {
                            $lookup: {
                                from: 'roles',
                                localField: 'roles',
                                foreignField: '_id',
                                as: 'roles',
                            },
                        },
                        {
                            $project: {
                                password: 0,
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    total: { $arrayElemAt: ['$metadata.total', 0] },
                    list: '$list',
                },
            },
        ]);
        if (!res) {
            return { total: 0, list: [] };
        }
        return {
            ...(res || {
                list: [],
                total: 0,
            }),
            ...pagination,
        };
    }
};
exports.AdmintorsService = AdmintorsService;
exports.AdmintorsService = AdmintorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(base_1.Admintors.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdmintorsService);
//# sourceMappingURL=admintors.service.js.map