import { OmitType } from '@nestjs/swagger';
import { Departments } from '../../../../mongo/base';

export class DepartmentsCreateBodyDto extends OmitType(Departments, [
  'deletedTime',
  'createdTime',
  'updatedTime',
]) {}
