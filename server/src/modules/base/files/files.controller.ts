import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  IntersectionType,
} from '@nestjs/swagger';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  FilesBatchDeleteDto,
  FilesPaginationResultDto,
  FilesQueryFilterDto,
  FilesUploadDto,
  FileUpdateDto,
  FileUploadDto,
  FileUploadSuccessResultDto,
} from './dto';
import { toNumber } from 'lodash';
import {
  DeleteResDto,
  ErrorResultDto,
  PaginationDto,
  UpdateResDto,
} from 'src/dtos';

@ApiTags('文件-Files')
@ApiBadRequestResponse({
  description: '失败',
  type: ErrorResultDto,
})
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadFile')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '多文件上传',
    type: FileUploadDto,
  })
  @ApiOkResponse({
    description: '多文件上传成功后返回',
    type: FileUploadSuccessResultDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadFile(file);
  }

  @Post('uploadFiles')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '多文件上传',
    type: FilesUploadDto,
  })
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
  @Post('getPaginationList')
  @ApiOkResponse({
    description: '获取分页列表',
    type: FilesPaginationResultDto,
  })
  @ApiOperation({
    description: '获取分页列表',
    summary: '获取分页列表',
  })
  async getPaginationList(
    @Query() pagination: PaginationDto,
    @Body() body: FilesQueryFilterDto,
  ) {
    const res = await this.filesService.getPaginationList(
      {
        pageNo: toNumber(pagination.pageNo),
        pageSize: toNumber(pagination.pageSize),
      },
      body,
    );
    return res;
  }

  @Delete('batchDelete')
  @ApiOperation({
    description: '批量删除文件',
    summary: '批量删除文件',
  })
  @ApiOkResponse({
    description: '删除成功',
    type: IntersectionType(UpdateResDto, DeleteResDto),
  })
  async batchDelete(@Body() body: FilesBatchDeleteDto) {
    const res = await this.filesService.batchDelete(body);
    return res;
  }

  @Patch('update')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '单文件上传',
    type: FileUpdateDto,
  })
  @ApiOkResponse({
    description: '更新成功后返回',
    type: FileUploadSuccessResultDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  updateFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('fileInfo') fileInfo: string,
  ) {
    this.filesService.updateFile(file, JSON.parse(fileInfo));
  }
}
