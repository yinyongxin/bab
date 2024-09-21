import { ApiProperty, PickType } from '@nestjs/swagger';
import { Users } from '../../../../mongo/base';

export class CreateUserBodyDto extends PickType(Users, [
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
