import { OmitType, PartialType } from '@nestjs/swagger';
import { Admintors } from '../../../../mongo/base';

export class AdmintorsFilterDto extends PartialType(
  OmitType(Admintors, ['password', 'deletedTime']),
) {}
