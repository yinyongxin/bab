import { OmitType, PartialType } from '@nestjs/swagger';
import { Admintors } from '../../../../mongo/base';

export class QueryAdmintorDto extends PartialType(
  OmitType(Admintors, ['password', 'deletedTime']),
) {}
