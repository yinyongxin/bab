import { Types } from 'mongoose';
export declare class QueryIdDto {
    id: string;
}
export declare class Document_idDto {
    _id: Types.ObjectId;
}
export declare class Result_idDto {
    _id: string;
}
export declare class DeleteIdsDto {
    ids: string[];
}
export declare class UpdateResDto {
    acknowledged: boolean;
    modifiedCount?: number;
    upsertedId?: null | string;
    upsertedCount?: number;
    matchedCount?: number;
}
export declare class DeleteResDto {
    acknowledged: boolean;
    deletedCount?: number;
}
export declare class PaginationDto {
    pageNo: number;
    pageSize: number;
}
export declare class PaginationResultDto extends PaginationDto {
    total: number;
}
export declare class ErrorResultDto {
    message: string;
    statusCode: number;
}
export declare class DateTimeRangeDto {
    createdTime?: [string, string] | [];
    updatedTime?: [string, string] | [];
}
