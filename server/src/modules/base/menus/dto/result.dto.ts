import { OmitType, IntersectionType } from '@nestjs/swagger';
import { Menus } from '../../../../mongo/base';
import { Result_idDto } from '../../../../dtos';

export class MenusResultDto extends IntersectionType(
  OmitType(Menus, ['deletedTime']),
  Result_idDto,
) {}
