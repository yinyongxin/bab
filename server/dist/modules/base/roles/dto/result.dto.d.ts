import { ObjectId } from 'mongoose';
import { PaginationResultDto } from '../../../../dtos';
import { Roles } from '../../../../mongo/base';
declare const RolesResultDto_base: import("@nestjs/common").Type<Omit<Roles, "deletedTime">>;
export declare class RolesResultDto extends RolesResultDto_base {
    _id: ObjectId;
}
export declare class RoleQueryPaginationResultDto extends PaginationResultDto {
    list: RolesResultDto[];
}
export {};
