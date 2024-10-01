import { ApiProperty, PickType } from '@nestjs/swagger';
import { Admintors } from '../../../../mongo/base';

export class CreateAdmintorBodyDto extends PickType(Admintors, [
  'password',
  'username',
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
