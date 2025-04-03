import {
  Body,
  Controller,
  Get,
  Query,
  Put,
  Delete,
  Patch,
  Post,
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
  MenusCreateBodyDto,
  MenusResultDto,
  TreeMenuDataDto,
  MenusUpdateDto,
  MenusQueryDto,
} from './dto';
import {
  DeleteIdsDto,
  DeleteResDto,
  QueryIdDto,
  UpdateResDto,
} from '../../../dtos';

@ApiTags('菜单-Menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly usersService: MenusService) {}

  @Put('addOne')
  @ApiOkResponse({
    description: '添加菜单成功',
    type: MenusResultDto,
  })
  @ApiOperation({
    description: '添加一个菜单',
    summary: '添加一个菜单',
  })
  async addOne(@Body() body: MenusCreateBodyDto) {
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
  async updateOne(@Query() query: QueryIdDto, @Body() body: MenusUpdateDto) {
    const res = await this.usersService.updateOne(query.id, body);
    return res;
  }

  @Get('findById')
  @ApiOkResponse({
    description: '查找成功',
    type: MenusResultDto,
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
    type: [TreeMenuDataDto],
  })
  @ApiOperation({
    description: '获取树形结构',
    summary: '获取树形结构',
  })
  async getTreeData() {
    const res = await this.usersService.getTreeData();
    return res;
  }

  @Post('getAllByFilter')
  @ApiOkResponse({
    description: '获取所有菜单',
    type: [MenusResultDto],
  })
  @ApiOperation({
    description: '获取所有菜单',
    summary: '获取所有菜单',
  })
  async getAllByFilter(@Body() body: MenusQueryDto) {
    const res = await this.usersService.getAllByFilter(body);
    return res;
  }
}
