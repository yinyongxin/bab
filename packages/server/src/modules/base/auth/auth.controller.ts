import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginSuccessResultDto, SignInDto } from './dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../../guards';

@ApiTags('限权-Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: '登录',
    summary: '登录',
  })
  @ApiOkResponse({
    description: 'Token和管理人员信息',
    type: LoginSuccessResultDto,
  })
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth('Authorization')
  getProfile(@Request() req) {
    return req.user;
  }
}
