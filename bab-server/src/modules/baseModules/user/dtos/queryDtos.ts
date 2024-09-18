import { OmitType, PartialType } from '@nestjs/swagger';
import { UserDocument } from '../../../../schemas/user/index.';

export class QueryUserDto extends PartialType(
  OmitType(UserDocument, ['password', 'deletedTime']),
) {}
