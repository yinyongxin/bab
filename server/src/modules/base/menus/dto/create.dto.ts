import { OmitType } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';

export class MenusCreateBodyDto extends OmitType(Menus, [
  'deletedTime',
  'createdTime',
  'updatedTime',
]) {}
