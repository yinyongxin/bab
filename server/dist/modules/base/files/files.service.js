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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const dayjs_1 = __importDefault(require("dayjs"));
const mongoose_1 = require("mongoose");
const files_1 = require("../../../mongo/base/files");
const mongoose_2 = require("@nestjs/mongoose");
const crypto_1 = require("crypto");
const tools_1 = require("../../../mongo/tools");
let FilesService = class FilesService {
    constructor(filesModel) {
        this.filesModel = filesModel;
    }
    async uploadFile(file) {
        const { mimetype, originalname } = file;
        const uuid = (0, crypto_1.randomUUID)();
        const uniquedName = `${uuid}.${originalname.split('.').pop()}`;
        const time = (0, dayjs_1.default)().format('YYYYMMDDHH');
        const dirPath = `${mimetype}/${time}`;
        const directoryPath = path_1.default.join(__dirname, `../static/${dirPath}`);
        try {
            await promises_1.default.access(directoryPath, promises_1.default.constants.F_OK);
        }
        catch {
            await promises_1.default.mkdir(directoryPath, { recursive: true });
        }
        const pathUrl = `/${dirPath}/${uniquedName}`;
        try {
            await promises_1.default.writeFile(path_1.default.join(directoryPath, `/${uniquedName}`), file.buffer);
            const fileCreate = await this.filesModel.create({
                mimetype,
                originalname,
                path: pathUrl,
                size: file.size,
                uniquedName,
            });
            fileCreate.save();
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('文件上传失败');
        }
        return {
            url: pathUrl,
        };
    }
    async getPaginationList(pagination, filter) {
        const { dateTimeRange, fuzzyFields, ...fields } = filter;
        const queryPaginationRes = await (0, tools_1.queryPagination)(this.filesModel, pagination, {
            ...fields,
            ...(0, tools_1.toFuzzyParams)(fuzzyFields),
            ...(0, tools_1.getDateTimeRange)(dateTimeRange),
        });
        return {
            ...queryPaginationRes,
            ...pagination,
        };
    }
    async batchDelete(filesBatchDeleteDto) {
        const [res] = await Promise.all([
            (0, tools_1.deleteByIds)(this.filesModel, filesBatchDeleteDto.fileList.map(({ _id }) => _id)),
            ...filesBatchDeleteDto.fileList.map(({ path: filePath }) => {
                const fullPath = path_1.default.join(__dirname, `../static${filePath}`);
                return promises_1.default.unlink(fullPath);
            }),
        ]);
        return res;
    }
    async updateFile(file, fileInfo) {
        const { path: filePath } = fileInfo;
        const fullPath = path_1.default.join(__dirname, `../static${filePath}`);
        await promises_1.default.unlink(fullPath);
        await promises_1.default.writeFile(fullPath, file.buffer);
        await this.filesModel.updateOne({ _id: fileInfo._id }, {
            mimetype: file.mimetype,
            originalname: file.originalname,
            size: file.size,
            $currentDate: {
                updatedTime: true,
            },
        });
        return {
            url: filePath,
        };
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(files_1.Files.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], FilesService);
//# sourceMappingURL=files.service.js.map