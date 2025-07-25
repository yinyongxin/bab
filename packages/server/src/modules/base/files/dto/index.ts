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

class FileInfo extends PickType(FilesResultDto, ['path', '_id']) {}

export class FileUpdateDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
  @ApiProperty({
    type: FileInfo,
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
export class FilesQueryFilterDto extends PartialType(
  OmitType(Files, [
    'deletedTime',
    'createdTime',
    'updatedTime',
    'originalname',
    'uniquedName',
  ]),
) {
  @ApiProperty({
    required: false,
    description: '时间范围',
    type: DateTimeRangeDto,
  })
  dateTimeRange?: DateTimeRangeDto;

  @ApiProperty({
    required: false,
    description: '模糊查询字段',
    type: PickType(Files, ['originalname', 'uniquedName']),
  })
  fuzzyFields?: Pick<Files, 'originalname' | 'uniquedName'>;
}

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
