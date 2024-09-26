import { OmitType, ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Menus } from '../../../../mongo/base';

export class ResultMenuDto extends OmitType(Menus, ['deletedTime']) {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: String,
  })
  _id: Types.ObjectId;
}
