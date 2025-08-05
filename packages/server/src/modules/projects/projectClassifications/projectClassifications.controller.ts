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
import { ProjectClassificationsService } from './projectClassifications.service';
import {
  ProjectClassificationsCreateBodyDto,
  ProjectClassificationsResultDto,
  ProjectClassificationsTreeDto,
  ProjectClassificationsUpdateDto,
  ProjectClassificationsQueryDto,
} from './dto';
import {
  DeleteIdsDto,
  DeleteResDto,
  QueryIdDto,
  UpdateResDto,
} from '../../../dtos';

@ApiTags('产品分类-ProjectClassifications')
@Controller('projectClassifications')
export class ProjectClassificationsController {
  constructor(
    private readonly projectClassificationsService: ProjectClassificationsService,
  ) {}

  @Put('addOne')
  @ApiOkResponse({
    description: '添加产品分类成功',
    type: ProjectClassificationsResultDto,
  })
  @ApiOperation({
    description: '添加一个产品分类',
    summary: '添加一个产品分类',
  })
  async addOne(@Body() body: ProjectClassificationsCreateBodyDto) {
    const res = await this.projectClassificationsService.addOne(body);
    return res;
  }

  @Delete('deleteByIds')
  @ApiResponse({
    description: '删除成功',
    type: IntersectionType(UpdateResDto, DeleteResDto),
  })
  @ApiOperation({
    description: '通过Ids删除产品分类',
    summary: '通过Id删除产品分类',
  })
  async deleteByIds(@Body() body: DeleteIdsDto) {
    const res = await this.projectClassificationsService.deleteByIds(body.ids);
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
    @Body() body: ProjectClassificationsUpdateDto,
  ) {
    const res = await this.projectClassificationsService.updateOne(
      query.id,
      body,
    );
    return res;
  }

  @Get('findById')
  @ApiOkResponse({
    description: '查找成功',
    type: ProjectClassificationsResultDto,
  })
  @ApiOperation({
    description: '通过Id查找产品分类',
    summary: '通过Id查找产品分类',
  })
  async findById(@Query() query: QueryIdDto) {
    const res = await this.projectClassificationsService.findById(query.id);
    return res;
  }

  @Get('getTreeData')
  @ApiOkResponse({
    description: '获取树形结构',
    type: [ProjectClassificationsTreeDto],
  })
  @ApiOperation({
    description: '获取树形结构',
    summary: '获取树形结构',
  })
  async getTreeData() {
    const res = await this.projectClassificationsService.getTreeData();
    return res;
  }

  @Post('getAllByFilter')
  @ApiOkResponse({
    description: '获取所有产品分类',
    type: [ProjectClassificationsResultDto],
  })
  @ApiOperation({
    description: '获取所有产品分类',
    summary: '获取所有产品分类',
  })
  async getAllByFilter(@Body() body: ProjectClassificationsQueryDto) {
    const res = await this.projectClassificationsService.getAllByFilter(body);
    return res;
  }
}
