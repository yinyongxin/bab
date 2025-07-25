import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PaginationResultDto } from '../../../../dtos';
import { Roles } from '../../../../mongo/base';

export class RolesResultDto extends OmitType(Roles, ['deletedTime']) {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: String,
  })
  _id: ObjectId;
}

export class RoleQueryPaginationResultDto extends PaginationResultDto {
  @ApiProperty({
    required: true,
    description: '所有数量',
    type: [RolesResultDto],
  })
  list: RolesResultDto[];
}
