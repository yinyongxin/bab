import { FilesService } from './files.service';
import { FilesBatchDeleteDto, FilesQueryFilterDto } from './dto';
import { PaginationDto } from 'src/dtos';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    uploadFiles(files: Array<Express.Multer.File>): void;
    getPaginationList(pagination: PaginationDto, body: FilesQueryFilterDto): Promise<{
        pageNo: number;
        pageSize: number;
        total: any;
        list: any;
    }>;
    batchDelete(body: FilesBatchDeleteDto): Promise<import("mongoose").UpdateWriteOpResult | import("mongodb").DeleteResult>;
    updateFile(file: Express.Multer.File, fileInfo: string): void;
}
