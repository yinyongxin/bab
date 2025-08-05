import { Admintors } from '../../../../mongo/base';
declare const AdmintorsCreateBodyDto_base: import("@nestjs/common").Type<Pick<Admintors, "username" | "password" | "roles">>;
export declare class AdmintorsCreateBodyDto extends AdmintorsCreateBodyDto_base {
    username: string;
    password: string;
}
export {};
