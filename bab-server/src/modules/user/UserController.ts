import {
  Body,
  Controller,
  Get,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import { UserService } from './UserService';
import { CreateUserBodyDto } from './dtos';
import { User } from 'src/schemas/user/index.';
import { DeleteIdsDto, QueryIdDto } from 'src/dto';

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
    description: '查找成功',
    type: OmitType(User, ['password']),
  })
  @ApiOperation({
    description: '通过Id查找用户',
    summary: '通过Id查找用户',
  })
  async findById(@Query() query: QueryIdDto) {
    const res = await this.userService.findById(query.id);
    return res;
  }

  @Delete('deleteByIds')
  @ApiOkResponse({
    description: '删除成功',
    type: OmitType(User, ['password']),
  })
  @ApiOperation({
    description: '通过Ids删除用户',
    summary: '通过Id删除用户',
  })
  async deleteByIds(@Body() body: DeleteIdsDto) {
    const res = await this.userService.deleteByIds(body.ids);
    return res;
  }
}
