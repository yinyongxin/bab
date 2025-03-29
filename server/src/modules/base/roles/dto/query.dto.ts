import { OmitType, PartialType } from '@nestjs/swagger';
import { Roles } from '../../../../mongo/base';

export class QueryRoleDto extends PartialType(
  OmitType(Roles, ['deletedTime']),
) {}
