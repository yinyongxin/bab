import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';
import { Types } from 'mongoose';
import { Document_idDto } from 'src/dtos';

export * from './create.dto';
export * from './query.dto';
export * from './result.dto';
export * from './update.dto';

export class TreeMenuDataDto extends IntersectionType(Menus, Document_idDto) {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: Array(TreeMenuDataDto),
    examples: [],
  })
  children: Array<TreeMenuDataDto>;
}
