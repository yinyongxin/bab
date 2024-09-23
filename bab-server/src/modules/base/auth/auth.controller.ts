import {
  Body,
  Controller,
  Post,
  HttpCode,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResultUserDto } from '../users';
import { AuthGuard } from '../../../guards';

@ApiTags('限权')
@ApiBearerAuth('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: '登录',
    summary: '登录',
  })
  @ApiOkResponse({
    description: 'Token和用户信息',
    type: ResultUserDto,
  })
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
