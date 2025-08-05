import { Roles } from '../../../../mongo/base';
declare const RoleCreateBodyDto_base: import("@nestjs/common").Type<Omit<Roles, "deletedTime" | "createdTime" | "updatedTime">>;
export declare class RoleCreateBodyDto extends RoleCreateBodyDto_base {
}
export {};
