import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from 'src/schemas/user/index.';

export class QueryUserDto extends PartialType(
  OmitType(User, ['password', 'deletedTime']),
) {}
