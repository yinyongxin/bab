import { ApiProperty } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';
import { Types } from 'mongoose';

export * from './create.dto';
export * from './query.dto';
export * from './result.dto';
export * from './update.dto';

export class TreeMenuDataDto extends Menus {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: Array(TreeMenuDataDto),
    examples: [],
  })
  children: Array<TreeMenuDataDto>;
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: String,
  })
  _id: Types.ObjectId;
}
