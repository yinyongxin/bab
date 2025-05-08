import { OmitType, PartialType } from '@nestjs/swagger';
import { ProjectClassifications } from '../../../../mongo/projects/projectClassifications';

export class ProjectClassificationsUpdateDto extends PartialType(
  OmitType(ProjectClassifications, [
    'deletedTime',
    'createdTime',
    'deletedTime',
  ]),
) {}
