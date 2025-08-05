import { Departments } from '../../../../mongo/base';
import { Result_idDto } from '../../../../dtos';
declare const DepartmentsResultDto_base: import("@nestjs/common").Type<Result_idDto & Omit<Departments, "deletedTime">>;
export declare class DepartmentsResultDto extends DepartmentsResultDto_base {
}
declare const TreeDepartmentsDataDto_base: import("@nestjs/common").Type<Result_idDto & Departments>;
export declare class TreeDepartmentsDataDto extends TreeDepartmentsDataDto_base {
    children: TreeDepartmentsDataDto[];
}
export {};
