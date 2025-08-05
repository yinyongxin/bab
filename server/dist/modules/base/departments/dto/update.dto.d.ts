import { Departments } from '../../../../mongo/base';
declare const DepartmentsUpdateDto_base: import("@nestjs/common").Type<Partial<Omit<Departments, "deletedTime" | "createdTime">>>;
export declare class DepartmentsUpdateDto extends DepartmentsUpdateDto_base {
}
export {};
