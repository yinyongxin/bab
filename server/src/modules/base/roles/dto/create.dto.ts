import { OmitType } from '@nestjs/swagger';
import { Roles } from '../../../../mongo/base';

export class RoleCreateBodyDto extends OmitType(Roles, [
  'deletedTime',
  'createdTime',
  'updatedTime',
]) {}
