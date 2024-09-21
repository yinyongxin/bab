import { OmitType, PartialType } from '@nestjs/swagger';
import { Users } from '../../../../mongo/base';

export class QueryUserDto extends PartialType(
  OmitType(Users, ['password', 'deletedTime']),
) {}
