import { Body, Controller, Get, Query, Put, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import { UserService } from './UserService';
import { CreateUserBodyDto } from './dtos/CreateUserDto';
import { User } from 'src/schemas/user/index.';
import { IdDto } from 'src/dto';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('addOne')
  @ApiOkResponse({
    description: '添加用户成功',
    type: OmitType(User, ['password']),
  })
  @ApiOperation({
    description: '添加一个用户',
    summary: '添加一个用户',
  })
  async addOne(@Body() body: CreateUserBodyDto) {
    const res = await this.userService.addOne(body);
    return res;
  }

  @Get('findById')
  @ApiOkResponse({
    description: '查找用户成功',
    type: OmitType(User, ['password']),
  })
  @ApiOperation({
    description: '通过Id查找用户',
    summary: '通过Id查找用户',
  })
  async findById(@Query() query: IdDto) {
    console.log('query', query);
    const res = await this.userService.findById(query.id);
    return res;
  }
}
