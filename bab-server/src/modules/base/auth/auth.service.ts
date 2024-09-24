import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdmintorsService } from '../admintors/admintors.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: AdmintorsService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOneByAdmintorname(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userInfo: user,
    };
  }
}
