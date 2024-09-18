import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

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

export class PaginationDto {
  @ApiProperty({
    required: true,
    description: '当前页面',
    example: 1,
  })
  pageNo: number;
  @ApiProperty({
    required: true,
    description: '分页大小',
    example: 10,
  })
  pageSize: number;
}

export class ResultPaginationDto extends PaginationDto {
  @ApiProperty({
    required: true,
    description: '所有数量',
    example: 1,
  })
  total: number;
}
