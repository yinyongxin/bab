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
import { AdmintorsService } from './admintors.service';
import {
  AdmintorsCreateBodyDto,
  AdmintorsFilterDto,
  AdmintorsResultDto,
  AdmintorsUpdateDto,
  AdmintorPaginationResultDto,
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

@ApiTags('管理人员-Admintors')
@Controller('admintors')
export class AdmintorsController {
  constructor(private readonly usersService: AdmintorsService) {}

  @Put('addOne')
  @ApiOkResponse({
    description: '添加管理人员成功',
    type: AdmintorsResultDto,
  })
  @ApiOperation({
    description: '添加一个管理人员',
    summary: '添加一个管理人员',
  })
  async addOne(@Body() body: AdmintorsCreateBodyDto) {
    const res = await this.usersService.addOne(body);
    return res;
  }

  @Delete('deleteByIds')
  @ApiResponse({
    description: '删除成功',
    type: IntersectionType(UpdateResDto, DeleteResDto),
  })
  @ApiOperation({
    description: '通过Ids删除管理人员',
    summary: '通过Id删除管理人员',
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
  async updateOne(
    @Query() query: QueryIdDto,
    @Body() body: AdmintorsUpdateDto,
  ) {
    console.log(query, 'query');
    console.log(body, 'body');
    const res = await this.usersService.updateOne(query.id, body);
    return res;
  }

  @Get('findById')
  @ApiOkResponse({
    description: '查找成功',
    type: AdmintorsResultDto,
  })
  @ApiOperation({
    description: '通过Id查找管理人员',
    summary: '通过Id查找管理人员',
  })
  async findById(@Query() query: QueryIdDto) {
    const res = await this.usersService.findById(query.id);
    return res;
  }

  @Public()
  @Post('getPageList')
  @ApiResponse({
    description: '获取分页列表',
    type: AdmintorPaginationResultDto,
  })
  @ApiOperation({
    description: '获取分页列表',
    summary: '获取分页列表',
  })
  async getPageList(
    @Query() pagination: PaginationDto,
    @Body() body: AdmintorsFilterDto,
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
