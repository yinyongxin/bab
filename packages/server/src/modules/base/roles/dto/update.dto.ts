import { OmitType, PartialType } from '@nestjs/swagger';
import { Roles } from '../../../../mongo/base';

export class RolesUpdateDto extends PartialType(
  OmitType(Roles, ['deletedTime', 'createdTime', 'deletedTime']),
) {}
