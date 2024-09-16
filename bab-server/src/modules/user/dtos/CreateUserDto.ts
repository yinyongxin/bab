import { PickType } from '@nestjs/swagger';
import { User } from 'src/schemas/user/index.';

export class CreateUserBodyDto extends PickType(User, [
  'password',
  'username',
]) {}
