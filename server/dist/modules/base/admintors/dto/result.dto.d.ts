import { ObjectId } from 'mongoose';
import { PaginationResultDto } from '../../../../dtos';
import { Admintors } from '../../../../mongo/base';
import { RolesResultDto } from '../../roles';
declare const AdmintorsResultDto_base: import("@nestjs/common").Type<Omit<Admintors, "deletedTime" | "password">>;
export declare class AdmintorsResultDto extends AdmintorsResultDto_base {
    _id: ObjectId;
}
declare const AdmintorsPageItemDto_base: import("@nestjs/common").Type<Omit<Admintors, "deletedTime" | "password" | "roles">>;
export declare class AdmintorsPageItemDto extends AdmintorsPageItemDto_base {
    _id: ObjectId;
    roles: RolesResultDto[];
}
export declare class AdmintorPaginationResultDto extends PaginationResultDto {
    list: AdmintorsPageItemDto[];
}
export {};
