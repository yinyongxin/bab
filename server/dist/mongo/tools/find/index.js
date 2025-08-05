"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPagination = exports.getDateTimeRange = exports.toFuzzyParams = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const toFuzzyParams = (data, fieldNames) => {
    const newParams = {};
    if (!data) {
        return newParams;
    }
    const names = fieldNames || Object.keys(data);
    if (!names.length) {
        return newParams;
    }
    names.forEach((name) => {
        const value = data[name];
        const isDateTime = (0, dayjs_1.default)(value).isValid();
        if (!isDateTime && typeof value === 'string' && value.trim() !== '') {
            newParams[name] = new RegExp(value.trim(), 'i');
        }
        else if (value !== undefined && value !== null) {
            newParams[name] = value;
        }
    });
    return newParams;
};
exports.toFuzzyParams = toFuzzyParams;
const getDateTimeRange = (dateTimeRangeDto) => {
    const range = {};
    if (!dateTimeRangeDto) {
        return range;
    }
    for (const key in dateTimeRangeDto) {
        if (dateTimeRangeDto.hasOwnProperty(key)) {
            const value = dateTimeRangeDto[key];
            if (value) {
                range[key] = {
                    $gte: new Date(value[0]),
                    $lte: new Date(value[1]),
                };
            }
        }
    }
    return range;
};
exports.getDateTimeRange = getDateTimeRange;
const queryPagination = async (model, pagination, filter, options) => {
    const { sort } = { sort: { createdTime: -1 }, ...options };
    const [res] = await model.aggregate([
        { $match: { ...filter } },
        { $sort: sort },
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
                list: '$list',
            },
        },
    ]);
    return {
        total: res?.total || 0,
        list: res?.list || [],
    };
};
exports.queryPagination = queryPagination;
//# sourceMappingURL=index.js.map