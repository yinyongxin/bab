import {
  Body,
  Controller,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  FilesPaginationResultDto,
  FilesQueryFilterDto,
  FilesUploadDto,
  FileUploadDto,
  FileUploadSuccessResultDto,
} from './dto';
import { toNumber } from 'lodash';
import { PaginationDto } from 'src/dtos';

@ApiTags('文件-Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadFile')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '单文件上传',
    type: FileUploadDto,
  })
  @ApiOkResponse({
    description: '单文件上传成功后返回',
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
}
