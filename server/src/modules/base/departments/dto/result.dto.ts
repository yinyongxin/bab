import { OmitType, IntersectionType, ApiProperty } from '@nestjs/swagger';
import { Departments } from '../../../../mongo/base';
import { Result_idDto } from '../../../../dtos';

export class DepartmentsResultDto extends IntersectionType(
  OmitType(Departments, ['deletedTime']),
  Result_idDto,
) {}

export class TreeDepartmentsDataDto extends IntersectionType(Departments, Result_idDto) {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: [TreeDepartmentsDataDto],
    examples: [],
  })
  children: TreeDepartmentsDataDto[];
}
