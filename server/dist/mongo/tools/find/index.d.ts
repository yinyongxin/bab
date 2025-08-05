import { Model } from 'mongoose';
import { DateTimeRangeDto, PaginationDto } from 'src/dtos';
export declare const toFuzzyParams: <D = Record<string, unknown>, K = keyof D>(data?: D, fieldNames?: (keyof D)[]) => D;
export declare const getDateTimeRange: (dateTimeRangeDto?: DateTimeRangeDto) => {};
export declare const queryPagination: <M extends Model<any>, F = Record<string, unknown>>(model: M, pagination: PaginationDto, filter?: F, options?: {
    sort: Record<string, 1 | -1>;
}) => Promise<{
    total: any;
    list: any;
}>;
