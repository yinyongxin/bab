import { Admintors } from '../../../../mongo/base';
import { DateTimeRangeDto } from 'src/dtos';
declare const AdmintorsFilterDto_base: import("@nestjs/common").Type<Partial<Omit<Admintors, "name" | "deletedTime" | "createdTime" | "updatedTime" | "username" | "password" | "email">>>;
export declare class AdmintorsFilterDto extends AdmintorsFilterDto_base {
    dateTimeRange?: DateTimeRangeDto;
    fuzzyFields?: Partial<Pick<Admintors, 'name' | 'username' | 'email'>>;
}
export {};
