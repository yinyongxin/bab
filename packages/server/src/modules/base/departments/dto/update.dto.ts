import { OmitType, PartialType } from '@nestjs/swagger';
import { Departments } from '../../../../mongo/base';

export class DepartmentsUpdateDto extends PartialType(
  OmitType(Departments, ['deletedTime', 'createdTime', 'deletedTime']),
) {}
