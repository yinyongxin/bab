import { ApiProperty } from '@nestjs/swagger';

export class QueryIdDto {
  @ApiProperty({
    required: true,
    description: '唯一值',
  })
  id: string;
}

export class DeleteIdsDto {
  @ApiProperty({
    required: true,
    description: '删除Id列表',
  })
  ids: string[];
}
