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

export class UpdateResDto {
  @ApiProperty({
    required: true,
    description: '是否成功',
  })
  acknowledged: boolean;
  @ApiProperty({
    required: false,
    description: '更新数量',
  })
  modifiedCount?: number;
  @ApiProperty({
    required: false,
    description: '更新插入id',
  })
  upsertedId?: null | string;
  @ApiProperty({
    required: false,
    description: '更新插入数量',
  })
  upsertedCount?: number;
  @ApiProperty({
    required: false,
    description: '匹配数量',
  })
  matchedCount?: number;
}
