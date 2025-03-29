import { OmitType } from '@nestjs/swagger';
import { Roles } from '../../../../mongo/base';

export class CreateRoleBodyDto extends OmitType(Roles, [
  'deletedTime',
  'createdTime',
  'updatedTime',
]) {}
