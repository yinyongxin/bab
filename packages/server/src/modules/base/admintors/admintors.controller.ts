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
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
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
  ErrorResultDto,
  PaginationDto,
  QueryIdDto,
  UpdateResDto,
} from '../../../dtos';
import { toNumber } from 'lodash';

@ApiTags('管理人员-Admintors')
@ApiBadRequestResponse({
  description: '失败',
  type: ErrorResultDto,
})
@Controller('admintors')
export class AdmintorsController {
  constructor(private readonly admintorsService: AdmintorsService) {}

  @Put('addOne')
  @ApiOperation({
    description: '添加一个管理人员',
    summary: '添加一个管理人员',
  })
  @ApiOkResponse({
    description: '添加管理人员成功',
    type: AdmintorsResultDto,
  })
  async addOne(@Body() body: AdmintorsCreateBodyDto) {
    const res = await this.admintorsService.addOne(body);
    return res;
  }

  @Delete('deleteByIds')
  @ApiOperation({
    description: '通过Ids删除管理人员',
    summary: '通过Id删除管理人员',
  })
  @ApiOkResponse({
    description: '删除成功',
    type: IntersectionType(UpdateResDto, DeleteResDto),
  })
  async deleteByIds(@Body() body: DeleteIdsDto) {
    const res = await this.admintorsService.deleteByIds(body.ids);
    return res;
  }

  @Patch('updateOne')
  @ApiOperation({
    description: '更新单条数据',
    summary: '更新单条数据',
  })
  @ApiOkResponse({
    description: '更新结果',
    type: UpdateResDto,
  })
  async updateOne(
    @Query() query: QueryIdDto,
    @Body() body: AdmintorsUpdateDto,
  ) {
    const res = await this.admintorsService.updateOne(query.id, body);
    return res;
  }

  @Get('findById')
  @ApiOperation({
    description: '通过Id查找管理人员',
    summary: '通过Id查找管理人员',
  })
  @ApiOkResponse({
    description: '查找成功',
    type: AdmintorsResultDto,
  })
  async findById(@Query() query: QueryIdDto) {
    const res = await this.admintorsService.findById(query.id);
    return res;
  }

  @Post('getPageList')
  @ApiOperation({
    description: '获取分页列表',
    summary: '获取分页列表',
  })
  @ApiOkResponse({
    description: '获取分页列表',
    type: AdmintorPaginationResultDto,
  })
  async getPageList(
    @Query() pagination: PaginationDto,
    @Body() body?: AdmintorsFilterDto,
  ) {
    const res = await this.admintorsService.getPageList(
      {
        pageNo: toNumber(pagination.pageNo),
        pageSize: toNumber(pagination.pageSize),
      },
      body,
    );
    return res;
  }
}
