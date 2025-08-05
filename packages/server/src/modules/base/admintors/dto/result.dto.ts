import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PaginationResultDto } from '../../../../dtos';
import { Admintors } from '../../../../mongo/base';
import { RolesResultDto } from '../../roles';

export class AdmintorsResultDto extends OmitType(Admintors, [
  'password',
  'deletedTime',
]) {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: String,
  })
  _id: ObjectId;
}

export class AdmintorsPageItemDto extends OmitType(Admintors, [
  'password',
  'deletedTime',
  'roles',
]) {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: String,
  })
  _id: ObjectId;

  @ApiProperty({
    required: true,
    description: '角色列表',
    type: [RolesResultDto],
  })
  roles: RolesResultDto[];
}

export class AdmintorPaginationResultDto extends PaginationResultDto {
  @ApiProperty({
    required: true,
    description: '所有数量',
    type: [AdmintorsPageItemDto],
  })
  list: AdmintorsPageItemDto[];
}
