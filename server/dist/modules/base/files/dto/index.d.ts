import { PaginationResultDto, Result_idDto } from 'src/dtos';
import { DateTimeRangeDto } from 'src/dtos';
import { Files } from 'src/mongo/base/files';
declare const FilesResultDto_base: import("@nestjs/common").Type<Result_idDto & Omit<Files, "deletedTime">>;
export declare class FilesResultDto extends FilesResultDto_base {
}
export declare class FileUploadDto {
    file: any;
}
export declare class FileUpdateDto {
    file: any;
    fileInfo: any;
}
export declare class FileUploadSuccessResultDto {
    url: string;
}
export declare class FilesUploadDto {
    files: any[];
}
export declare class FilesUploadSuccessResultDto {
    urls: string[];
}
declare const FilesQueryFilterDto_base: import("@nestjs/common").Type<Partial<Omit<Files, "deletedTime" | "createdTime" | "updatedTime" | "originalname" | "uniquedName">>>;
export declare class FilesQueryFilterDto extends FilesQueryFilterDto_base {
    dateTimeRange?: DateTimeRangeDto;
    fuzzyFields?: Pick<Files, 'originalname' | 'uniquedName'>;
}
export declare class FilesPaginationResultDto extends PaginationResultDto {
    list: FilesResultDto[];
}
export declare class FilesBatchDeleteDto {
    fileList: FilesResultDto[];
}
export {};
