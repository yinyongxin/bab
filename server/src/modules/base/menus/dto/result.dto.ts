import { OmitType, IntersectionType, ApiProperty } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';
import { Result_idDto } from '../../../../dtos';

export class MenusResultDto extends IntersectionType(
  OmitType(Menus, ['deletedTime']),
  Result_idDto,
) {}

export class TreeMenuDataDto extends IntersectionType(Menus, Result_idDto) {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: () => Array(TreeMenuDataDto),
    examples: [],
    enumName: 'TreeMenuDataDto',
  })
  children: TreeMenuDataDto[];
}
