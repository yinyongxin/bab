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
import { DepartmentsService } from './departments.service';
import {
  DepartmentsCreateBodyDto,
  DepartmentsResultDto,
  TreeDepartmentsDataDto,
  DepartmentsUpdateDto,
  DepartmentsQueryDto,
} from './dto';
import {
  DeleteIdsDto,
  DeleteResDto,
  QueryIdDto,
  UpdateResDto,
} from '../../../dtos';

@ApiTags('部门-Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Put('addOne')
  @ApiOkResponse({
    description: '添加部门成功',
    type: DepartmentsResultDto,
  })
  @ApiOperation({
    description: '添加一个部门',
    summary: '添加一个部门',
  })
  async addOne(@Body() body: DepartmentsCreateBodyDto) {
    const res = await this.departmentsService.addOne(body);
    return res;
  }

  @Delete('deleteByIds')
  @ApiResponse({
    description: '删除成功',
    type: IntersectionType(UpdateResDto, DeleteResDto),
  })
  @ApiOperation({
    description: '通过Ids删除部门',
    summary: '通过Id删除部门',
  })
  async deleteByIds(@Body() body: DeleteIdsDto) {
    const res = await this.departmentsService.deleteByIds(body.ids);
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
  async updateOne(@Query() query: QueryIdDto, @Body() body: DepartmentsUpdateDto) {
    const res = await this.departmentsService.updateOne(query.id, body);
    return res;
  }

  @Get('findById')
  @ApiOkResponse({
    description: '查找成功',
    type: DepartmentsResultDto,
  })
  @ApiOperation({
    description: '通过Id查找部门',
    summary: '通过Id查找部门',
  })
  async findById(@Query() query: QueryIdDto) {
    const res = await this.departmentsService.findById(query.id);
    return res;
  }

  @Get('getTreeData')
  @ApiOkResponse({
    description: '获取树形结构',
    type: [TreeDepartmentsDataDto],
  })
  @ApiOperation({
    description: '获取树形结构',
    summary: '获取树形结构',
  })
  async getTreeData() {
    const res = await this.departmentsService.getTreeData();
    return res;
  }

  @Post('getAllByFilter')
  @ApiOkResponse({
    description: '获取所有部门',
    type: [DepartmentsResultDto],
  })
  @ApiOperation({
    description: '获取所有部门',
    summary: '获取所有部门',
  })
  async getAllByFilter(@Body() body: DepartmentsQueryDto) {
    const res = await this.departmentsService.getAllByFilter(body);
    return res;
  }
}
