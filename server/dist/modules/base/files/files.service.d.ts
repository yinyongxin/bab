import { FilesBatchDeleteDto, FilesQueryFilterDto, FilesResultDto } from './dto';
import { Model } from 'mongoose';
import { Files } from '../../../mongo/base/files';
import { PaginationDto } from 'src/dtos';
export declare class FilesService {
    private filesModel;
    constructor(filesModel: Model<Files>);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    getPaginationList(pagination: PaginationDto, filter: FilesQueryFilterDto): Promise<{
        pageNo: number;
        pageSize: number;
        total: any;
        list: any;
    }>;
    batchDelete(filesBatchDeleteDto: FilesBatchDeleteDto): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateFile(file: Express.Multer.File, fileInfo: Pick<FilesResultDto, 'path' | '_id'>): Promise<{
        url: string;
    }>;
}
