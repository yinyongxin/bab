import { OmitType } from '@nestjs/swagger';
import { ProjectClassifications } from '../../../../mongo/projects/projectClassifications';

export class ProjectClassificationsCreateBodyDto extends OmitType(
  ProjectClassifications,
  ['deletedTime', 'createdTime', 'updatedTime'],
) {}
