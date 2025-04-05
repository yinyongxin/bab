import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdmintorsService } from '../admintors/admintors.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto';
import { RolesService } from '../roles';
import { uniq } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private admintorsService: AdmintorsService,
    private rolesService: RolesService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, username, password } = signInDto;
    const user = await this.admintorsService.findOneByFilter({
      username,
      email,
    });
    const roleList = await Promise.all(
      user.roles.map(async (roleId) => {
        const menus = await this.rolesService.findById(roleId.toString());
        return menus;
      }),
    );
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userInfo: user,
      menus: uniq(roleList.map((item) => item.menus).flat()),
    };
  }
}
