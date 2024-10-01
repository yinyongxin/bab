import { OmitType } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';

export class CreateMenuBodyDto extends OmitType(Menus, [
  'deletedTime',
  'createdTime',
  'updatedTime',
]) {}
