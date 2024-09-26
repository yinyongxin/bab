import { ApiProperty } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';

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
  children: TreeMenuDataDto[];
}
