import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../../../../schemas/user';

export class CreateUserBodyDto extends PickType(User, [
  'password',
  'username',
]) {
  @ApiProperty({
    example: 'username',
  })
  username: string;
  @ApiProperty({
    example: '123456',
  })
  password: string;
}
