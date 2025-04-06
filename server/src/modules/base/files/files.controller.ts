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
  FilesUploadDto,
  FileUploadDto,
  FileUploadSuccessResultDto,
  QueryDirsFilterDto,
  QueryDirsPaginationDto,
  QueryDirsPaginationResultDto,
} from './dto';
import { toNumber } from 'lodash';

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
  @Post('getDirsPagination')
  @ApiOkResponse({
    description: '获取分页列表',
    type: QueryDirsPaginationResultDto,
  })
  @ApiOperation({
    description: '获取分页列表',
    summary: '获取分页列表',
  })
  async getDirsPagination(
    @Query() pagination: QueryDirsPaginationDto,
    @Body() body: QueryDirsFilterDto,
  ) {
    const res = await this.filesService.getDirsPagination(
      {
        pageNo: pagination.pageNo ? toNumber(pagination.pageNo) : undefined,
        pageSize: pagination.pageSize
          ? toNumber(pagination.pageSize)
          : undefined,
      },
      body,
    );
    return res;
  }
}
