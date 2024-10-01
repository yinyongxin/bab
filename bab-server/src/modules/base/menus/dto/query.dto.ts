import { OmitType, PartialType } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';

export class QueryMenuDto extends PartialType(
  OmitType(Menus, ['deletedTime']),
) {}
