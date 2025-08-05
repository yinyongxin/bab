import { Admintors } from '../../../../mongo/base';
declare const AdmintorsUpdateDto_base: import("@nestjs/common").Type<Partial<Omit<Admintors, "deletedTime" | "createdTime" | "updatedTime" | "password">>>;
export declare class AdmintorsUpdateDto extends AdmintorsUpdateDto_base {
}
export {};
