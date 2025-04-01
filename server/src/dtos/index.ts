import { ApiProperty } from '@nestjs/swagger';
import { ObjectId, Types } from 'mongoose';

export class QueryIdDto {
  @ApiProperty({
    required: true,
    description: '唯一值',
  })
  id: string;
}

export class Document_idDto {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: Types.ObjectId,
  })
  _id: Types.ObjectId;
}

export class Result_idDto {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: Types.ObjectId,
  })
  _id: Types.ObjectId;
}

export class DeleteIdsDto {
  @ApiProperty({
    required: true,
    description: '删除Id列表',
    type: Array(Types.ObjectId),
    enumName: 'ids',
  })
  ids: ObjectId[];
}

export class UpdateResDto {
  @ApiProperty({
    required: true,
    description: '是否成功',
  })
  acknowledged: boolean;

  /**
   * 更新数量
   */
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

  /**
   * 符合更新条件的数量
   */
  @ApiProperty({
    required: false,
    description: '符合更新条件的数量',
  })
  matchedCount?: number;
}

export class DeleteResDto {
  @ApiProperty({
    required: true,
    description: '是否成功',
  })
  acknowledged: boolean;
  @ApiProperty({
    required: false,
    description: '匹配数量',
  })
  deletedCount?: number;
}

export class PaginationDto {
  @ApiProperty({
    required: true,
    description: '当前页面',
    minimum: 1,
    example: 1,
  })
  pageNo: number;
  @ApiProperty({
    required: true,
    description: '分页大小',
    minimum: 1,
    example: 10,
  })
  pageSize: number;
}

export class PaginationResultDto extends PaginationDto {
  @ApiProperty({
    required: true,
    description: '所有数量',
    example: 1,
  })
  total: number;
}
