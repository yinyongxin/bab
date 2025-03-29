import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';
import { Result_idDto } from '../../../../dtos';

export * from './create.dto';
export * from './query.dto';
export * from './result.dto';
export * from './update.dto';

export class TreeMenuDataDto extends IntersectionType(Menus, Result_idDto) {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: Array(TreeMenuDataDto),
    examples: [],
  })
  children: Array<TreeMenuDataDto>;
}
