import { OmitType, ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Menus } from '../../../../mongo/base';
import { Document_idDto } from 'src/dtos';

export class ResultMenuDto extends IntersectionType(
  OmitType(Menus, ['deletedTime']),
  Document_idDto,
) {}
