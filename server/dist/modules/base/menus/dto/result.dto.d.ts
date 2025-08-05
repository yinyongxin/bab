import { Menus } from '../../../../mongo/base';
import { Result_idDto } from '../../../../dtos';
declare const MenusResultDto_base: import("@nestjs/common").Type<Result_idDto & Omit<Menus, "deletedTime">>;
export declare class MenusResultDto extends MenusResultDto_base {
}
declare const TreeMenuDataDto_base: import("@nestjs/common").Type<Result_idDto & Menus>;
export declare class TreeMenuDataDto extends TreeMenuDataDto_base {
    children: TreeMenuDataDto[];
}
export {};
