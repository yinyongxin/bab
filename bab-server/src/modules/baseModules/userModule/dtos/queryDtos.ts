import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../../../../schemas/user';

export class QueryUserDto extends PartialType(
  OmitType(User, ['password', 'deletedTime']),
) {}
