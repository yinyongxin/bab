import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PaginationResultDto } from '../../../../dtos';
import { Admintors } from '../../../../mongo/base';

export class ResultAdmintorDto extends OmitType(Admintors, [
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

export class AdmintorPaginationQueryResultDto extends PaginationResultDto {
  @ApiProperty({
    required: true,
    description: '所有数量',
    type: [ResultAdmintorDto],
  })
  list: ResultAdmintorDto[];
}
