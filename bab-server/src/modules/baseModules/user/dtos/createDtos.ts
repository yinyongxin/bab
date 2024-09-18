import { PickType } from '@nestjs/swagger';
import { UserDocument } from '../../../../schemas/user/index.';

export class CreateUserBodyDto extends PickType(UserDocument, [
  'password',
  'username',
]) {}
