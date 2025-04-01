import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdmintorsService } from '../admintors/admintors.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: AdmintorsService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, username, password } = signInDto;
    const user = await this.usersService.findOneByFilter({ username, email });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userInfo: user,
    };
  }
}
