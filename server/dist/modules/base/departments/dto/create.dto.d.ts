import { Departments } from '../../../../mongo/base';
declare const DepartmentsCreateBodyDto_base: import("@nestjs/common").Type<Omit<Departments, "deletedTime" | "createdTime" | "updatedTime">>;
export declare class DepartmentsCreateBodyDto extends DepartmentsCreateBodyDto_base {
}
export {};
