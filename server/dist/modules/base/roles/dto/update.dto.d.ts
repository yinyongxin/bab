import { Roles } from '../../../../mongo/base';
declare const RolesUpdateDto_base: import("@nestjs/common").Type<Partial<Omit<Roles, "deletedTime" | "createdTime">>>;
export declare class RolesUpdateDto extends RolesUpdateDto_base {
}
export {};
