import {
  Body,
  Controller,
  Get,
  Query,
  Put,
  Delete,
  Post,
  Patch,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  CreateUserBodyDto,
  QueryUserDto,
  ResultUserDto,
  UpdateUserDto,
  UserPaginationQueryResultDto,
} from './dtos';
import {
  DeleteIdsDto,
  PaginationDto,
  QueryIdDto,
  UpdateResDto,
} from '../../../dtos';
import { toInt } from 'radash';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('addOne')
  @ApiOkResponse({
    description: '添加用户成功',
    type: ResultUserDto,
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
    type: ResultUserDto,
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
  @ApiResponse({
    description: '删除成功',
    type: UpdateResDto,
  })
  @ApiOperation({
    description: '通过Ids删除用户',
    summary: '通过Id删除用户',
  })
  async deleteByIds(@Body() body: DeleteIdsDto) {
    const res = await this.userService.deleteByIds(body.ids);
    return res;
  }

  @Post('findAllByFields')
  @ApiOkResponse({
    description: '查询成功',
    type: [ResultUserDto],
  })
  @ApiOperation({
    description: '通过字段值查询所有数据',
    summary: '通过字段值查询所有数据',
  })
  async findAllByFields(@Body() body: QueryUserDto) {
    const res = await this.userService.findAllByFields(body);
    return res;
  }

  @Patch('updateOne')
  @ApiResponse({
    description: '更新结果',
    type: UpdateResDto,
  })
  @ApiOperation({
    description: '更新单条数据',
    summary: '更新单条数据',
  })
  async updateOne(@Query() query: QueryIdDto, @Body() body: UpdateUserDto) {
    const res = await this.userService.updateOne(query.id, body);
    return res;
  }

  @Post('getPageList')
  @ApiResponse({
    description: '获取分页列表',
    type: UserPaginationQueryResultDto,
  })
  @ApiOperation({
    description: '获取分页列表',
    summary: '获取分页列表',
  })
  async getPageList(
    @Query() pagination: PaginationDto,
    @Body() body: QueryUserDto,
  ) {
    const res = await this.userService.getPageList(
      {
        pageNo: toInt(pagination.pageNo),
        pageSize: toInt(pagination.pageSize),
      },
      body,
    );
    return res;
  }
}
