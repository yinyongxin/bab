import { OmitType, PartialType } from '@nestjs/swagger';
import { Roles } from '../../../../mongo/base';

export class UpdateRoleDto extends PartialType(
  OmitType(Roles, ['deletedTime', 'createdTime', 'deletedTime']),
) {}
