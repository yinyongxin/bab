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
import { MenusService } from './menus.service';
import {
  CreateMenuBodyDto,
  ResultMenuDto,
  TreeMenuDataDto,
  UpdateMenuDto,
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

@ApiTags('菜单')
@Controller('menus')
export class MenusController {
  constructor(private readonly usersService: MenusService) {}

  @Put('addOne')
  @ApiOkResponse({
    description: '添加菜单成功',
    type: ResultMenuDto,
  })
  @ApiOperation({
    description: '添加一个菜单',
    summary: '添加一个菜单',
  })
  async addOne(@Body() body: CreateMenuBodyDto) {
    const res = await this.usersService.addOne(body);
    return res;
  }

  @Delete('deleteByIds')
  @ApiResponse({
    description: '删除成功',
    type: IntersectionType(UpdateResDto, DeleteResDto),
  })
  @ApiOperation({
    description: '通过Ids删除菜单',
    summary: '通过Id删除菜单',
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
  async updateOne(@Query() query: QueryIdDto, @Body() body: UpdateMenuDto) {
    const res = await this.usersService.updateOne(query.id, body);
    return res;
  }

  @Get('findById')
  @ApiOkResponse({
    description: '查找成功',
    type: ResultMenuDto,
  })
  @ApiOperation({
    description: '通过Id查找菜单',
    summary: '通过Id查找菜单',
  })
  async findById(@Query() query: QueryIdDto) {
    const res = await this.usersService.findById(query.id);
    return res;
  }

  @Get('getTreeData')
  @ApiOkResponse({
    description: '获取树形结构',
    type: TreeMenuDataDto,
  })
  @ApiOperation({
    description: '获取树形结构',
    summary: '获取树形结构',
  })
  async getTreeData() {
    const res = await this.usersService.getTreeData();
    return res;
  }
}
