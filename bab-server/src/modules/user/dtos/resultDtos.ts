import { PartialType, OmitType } from '@nestjs/swagger';
import { User } from 'src/schemas/user/index.';

export class ResultUserDto extends PartialType(
  OmitType(User, ['password', 'deletedTime']),
) {}
