import { OmitType, PartialType } from '@nestjs/swagger';
import { Users } from '../../../../db/schemas';

export class QueryUserDto extends PartialType(
  OmitType(Users, ['password', 'deletedTime']),
) {}
