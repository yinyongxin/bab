import { OmitType, PartialType } from '@nestjs/swagger';
import { Roles } from '../../../../mongo/base';

export class RolesQueryFilterDto extends PartialType(
  OmitType(Roles, ['deletedTime']),
) {}
