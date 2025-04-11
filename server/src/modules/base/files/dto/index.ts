import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { PaginationResultDto, Result_idDto } from 'src/dtos';
import { DateTimeRangeDto } from 'src/dtos';
import { Files } from 'src/mongo/base/files';

export class FilesResultDto extends IntersectionType(
  OmitType(Files, ['deletedTime']),
  Result_idDto,
) {}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class FileUpdateDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
  @ApiProperty({
    type: PickType(FilesResultDto, ['path', '_id']),
    format: 'binary',
  })
  fileInfo: any;
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

export class QueryDirsFilterDto {
  @ApiProperty({
    required: false,
    description: '路径',
  })
  dirPath?: string;
}

export class FilesQueryFilterDto extends IntersectionType(
  PartialType(OmitType(Files, ['deletedTime', 'createdTime', 'updatedTime'])),
  DateTimeRangeDto,
) {}

export class FilesPaginationResultDto extends PaginationResultDto {
  @ApiProperty({
    required: true,
    description: '所有数量',
    type: [FilesResultDto],
  })
  list: FilesResultDto[];
}

export class FilesBatchDeleteDto {
  @ApiProperty({
    required: true,
    description: '文件列表',
    type: [FilesResultDto],
  })
  fileList: FilesResultDto[];
}
