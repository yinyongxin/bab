import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FilesUploadDto, FileUploadDto } from './dto';

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
}
