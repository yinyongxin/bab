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
  IntersectionType,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import {
  RoleCreateBodyDto,
  RolesQueryFilterDto,
  RolesResultDto,
  RolesUpdateDto,
  RoleQueryPaginationResultDto,
} from './dto';
import {
  DeleteIdsDto,
  DeleteResDto,
  PaginationDto,
  QueryIdDto,
  UpdateResDto,
} from '../../../dtos';
import { toInt } from 'radash';
import { Public } from '../../../decorators';

@ApiTags('角色-Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly usersService: RolesService) {}

  @Put('addOne')
  @ApiOkResponse({
    description: '添加角色成功',
    type: RolesResultDto,
  })
  @ApiOperation({
    description: '添加一个角色',
    summary: '添加一个角色',
  })
  async addOne(@Body() body: RoleCreateBodyDto) {
    const res = await this.usersService.addOne(body);
    return res;
  }

  @Delete('deleteByIds')
  @ApiResponse({
    description: '删除成功',
    type: IntersectionType(UpdateResDto, DeleteResDto),
  })
  @ApiOperation({
    description: '通过Ids删除角色',
    summary: '通过Id删除角色',
  })
  async deleteByIds(@Body() body: DeleteIdsDto) {
    const res = await this.usersService.deleteByIds(body.ids);
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
  async updateOne(@Query() query: QueryIdDto, @Body() body: RolesUpdateDto) {
    const res = await this.usersService.updateOne(query.id, body);
    return res;
  }

  @Get('findById')
  @ApiOkResponse({
    description: '查找成功',
    type: RolesResultDto,
  })
  @ApiOperation({
    description: '通过Id查找角色',
    summary: '通过Id查找角色',
  })
  async findById(@Query() query: QueryIdDto) {
    const res = await this.usersService.findById(query.id);
    return res;
  }

  @Post('findAllByFilter')
  @ApiOkResponse({
    description: '查询成功',
    type: [RolesResultDto],
  })
  @ApiOperation({
    description: '通过条件查询所有数据, 不支持分页',
    summary: '通过条件查询所有数据',
  })
  async findAllByFilter(@Body() body: RolesQueryFilterDto) {
    const res = await this.usersService.findAllByFilter(body);
    return res;
  }

  @Public()
  @Post('getPageList')
  @ApiOkResponse({
    description: '获取分页列表',
    type: RoleQueryPaginationResultDto,
  })
  @ApiOperation({
    description: '获取分页列表',
    summary: '获取分页列表',
  })
  async getPageList(
    @Query() pagination: PaginationDto,
    @Body() body: RolesQueryFilterDto,
  ) {
    const res = await this.usersService.getPageList(
      {
        pageNo: toInt(pagination.pageNo),
        pageSize: toInt(pagination.pageSize),
      },
      body,
    );
    return res;
  }
}
