import { Admintors } from '../../../../mongo/base';
import { AdmintorsResultDto } from '../../admintors';
declare const SignInDto_base: import("@nestjs/common").Type<Pick<Admintors, "username" | "password" | "email">>;
export declare class SignInDto extends SignInDto_base {
    username: string;
    email: string;
}
export declare class LoginSuccessResultDto {
    access_token: string;
    userInfo: AdmintorsResultDto;
    menus: string[];
}
export {};
