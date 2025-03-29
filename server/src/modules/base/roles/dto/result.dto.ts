import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ResultPaginationDto } from '../../../../dtos';
import { Roles } from '../../../../mongo/base';

export class ResultRoleDto extends OmitType(Roles, ['deletedTime']) {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: String,
  })
  _id: ObjectId;
}

export class RolePaginationQueryResultDto extends ResultPaginationDto {
  @ApiProperty({
    required: true,
    description: '所有数量',
    type: [ResultRoleDto],
  })
  list: ResultRoleDto[];
}
