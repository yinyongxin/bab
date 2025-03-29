import { PickType, ApiProperty } from '@nestjs/swagger';
import { Admintors } from '../../../../mongo/base';

export class SignInDto extends PickType(Admintors, ['password', 'username']) {
  @ApiProperty({
    example: 'username',
  })
  username: string;
  @ApiProperty({
    example: '123456',
  })
  password: string;
}
