import { AdmintorsService } from '../admintors/admintors.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto';
import { RolesService } from '../roles';
export declare class AuthService {
    private admintorsService;
    private rolesService;
    private jwtService;
    constructor(admintorsService: AdmintorsService, rolesService: RolesService, jwtService: JwtService);
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
        userInfo: import("mongoose").Document<unknown, {}, import("../../../mongo/base").Admintors> & import("../../../mongo/base").Admintors & {
            _id: import("mongoose").Types.ObjectId;
        };
        menus: string[];
    }>;
}
