import { OmitType, PartialType } from '@nestjs/swagger';
import { ProjectClassifications } from '../../../../mongo/projects/projectClassifications';

export class ProjectClassificationsQueryDto extends PartialType(
  OmitType(ProjectClassifications, ['deletedTime']),
) {}
