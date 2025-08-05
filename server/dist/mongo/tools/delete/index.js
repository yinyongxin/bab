"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteByIds = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const deleteByIds = async (model, ids, isFake = false) => {
    if (isFake) {
        return model.updateMany({ _id: { $in: ids } }, { deletedTime: (0, dayjs_1.default)() });
    }
    else {
        return model.deleteMany({ _id: { $in: ids } });
    }
};
exports.deleteByIds = deleteByIds;
//# sourceMappingURL=index.js.map