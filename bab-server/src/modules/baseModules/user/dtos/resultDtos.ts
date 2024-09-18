import { OmitType, ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ResultPaginationDto } from '../../../../dto';
import { User } from '../../../../schemas/user/index.';

export class ResultUserDto extends OmitType(User, ['password', 'deletedTime']) {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: String,
  })
  _id: ObjectId;
}

export class UserPaginationQueryResultDto extends ResultPaginationDto {
  @ApiProperty({
    required: true,
    description: '所有数量',
    type: [ResultUserDto],
  })
  list: ResultUserDto[];
}
