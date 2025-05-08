import { OmitType, IntersectionType, ApiProperty } from '@nestjs/swagger';
import { ProjectClassifications } from '../../../../mongo/projects/projectClassifications';
import { Result_idDto } from '../../../../dtos';

export class ProjectClassificationsResultDto extends IntersectionType(
  OmitType(ProjectClassifications, ['deletedTime']),
  Result_idDto,
) {}

export class ProjectClassificationsTreeDto extends IntersectionType(
  ProjectClassifications,
  Result_idDto,
) {
  @ApiProperty({
    required: true,
    description: '唯一值',
    type: [ProjectClassificationsTreeDto],
    examples: [],
  })
  children: ProjectClassificationsTreeDto[];
}
