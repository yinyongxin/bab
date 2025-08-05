import { AuthService } from './auth.service';
import { SignInDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
        userInfo: import("mongoose").Document<unknown, {}, import("../../../mongo/base").Admintors> & import("../../../mongo/base").Admintors & {
            _id: import("mongoose").Types.ObjectId;
        };
        menus: string[];
    }>;
    getProfile(req: any): any;
}
