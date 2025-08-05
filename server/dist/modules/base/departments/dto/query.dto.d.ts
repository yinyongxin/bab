import { Departments } from '../../../../mongo/base';
declare const DepartmentsQueryDto_base: import("@nestjs/common").Type<Partial<Omit<Departments, "deletedTime">>>;
export declare class DepartmentsQueryDto extends DepartmentsQueryDto_base {
}
export {};
