import { OmitType, PartialType } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';

export class MenusUpdateDto extends PartialType(
  OmitType(Menus, ['deletedTime', 'createdTime', 'deletedTime']),
) {}
