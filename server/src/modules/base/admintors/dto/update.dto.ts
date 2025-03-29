import { OmitType, PartialType } from '@nestjs/swagger';
import { Admintors } from '../../../../mongo/base';

export class UpdateAdmintorDto extends PartialType(
  OmitType(Admintors, [
    'password',
    'deletedTime',
    'createdTime',
    'deletedTime',
  ]),
) {}
