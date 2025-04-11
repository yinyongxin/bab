import { OmitType, PartialType, IntersectionType } from '@nestjs/swagger';
import { Admintors } from '../../../../mongo/base';
import { DateTimeRangeDto } from 'src/dtos';

export class AdmintorsFilterDto extends IntersectionType(
  PartialType(OmitType(Admintors, ['password', 'deletedTime'])),
  DateTimeRangeDto,
) {}
