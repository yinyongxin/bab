import { OmitType, PartialType } from '@nestjs/swagger';
import { Admintors } from '../../../../mongo/base';

export class AdmintorsUpdateDto extends PartialType(
  OmitType(Admintors, [
    'password',
    'createdTime',
    'deletedTime',
    'updatedTime',
  ]),
) {}
