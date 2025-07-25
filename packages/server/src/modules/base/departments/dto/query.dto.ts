import { OmitType, PartialType } from '@nestjs/swagger';
import { Departments } from '../../../../mongo/base';

export class DepartmentsQueryDto extends PartialType(
  OmitType(Departments, ['deletedTime']),
) {}
