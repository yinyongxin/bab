import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PaginationDto, PaginationResultDto } from 'src/dtos';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class FileUploadSuccessResultDto {
  @ApiProperty({
    required: true,
    description: '图片地址',
  })
  url: string;
}
export class FilesUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}

export class FilesUploadSuccessResultDto {
  @ApiProperty({
    required: true,
    description: '图片地址',
  })
  urls: string[];
}

export class QueryDirsPaginationDto extends PartialType(PaginationDto) {}

export class QueryDirsPaginationResultDto extends PartialType(
  PaginationResultDto,
) {
  @ApiProperty({
    required: true,
    description: '列表',
    type: [String],
  })
  list: string[];
}

export class QueryDirsFilterDto {
  @ApiProperty({
    required: false,
    description: '路径',
  })
  dirPath?: string;
}
