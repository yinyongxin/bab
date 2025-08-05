import { Menus } from '../../../../mongo/base';
declare const MenusUpdateDto_base: import("@nestjs/common").Type<Partial<Omit<Menus, "deletedTime" | "createdTime">>>;
export declare class MenusUpdateDto extends MenusUpdateDto_base {
}
export {};
