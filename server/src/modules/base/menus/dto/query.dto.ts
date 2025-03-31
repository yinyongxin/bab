import { OmitType, PartialType } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';

export class MenusQueryDto extends PartialType(
  OmitType(Menus, ['deletedTime']),
) {}
