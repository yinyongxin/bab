import { OmitType, PartialType } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';

export class UpdateMenuDto extends PartialType(
  OmitType(Menus, ['deletedTime', 'createdTime', 'deletedTime']),
) {}
