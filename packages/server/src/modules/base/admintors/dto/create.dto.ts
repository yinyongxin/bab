import { ApiProperty, PickType } from '@nestjs/swagger';
import { Admintors } from '../../../../mongo/base';

export class AdmintorsCreateBodyDto extends PickType(Admintors, [
  'password',
  'username',
  'roles',
]) {
  @ApiProperty({
    example: 'admin',
  })
  username: string;
  @ApiProperty({
    example: '123456',
  })
  password: string;
}
