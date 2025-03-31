import { PickType, ApiProperty } from '@nestjs/swagger';
import { Admintors } from '../../../../mongo/base';
import { AdmintorsResultDto } from '../../admintors';

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

export class LoginSuccessResultDto {
  @ApiProperty({
    example: 'token123456',
    type: AdmintorsResultDto,
  })
  access_token: string;

  @ApiProperty({
    example: {
      createdTime: '1743413281187',
      updatedTime: '1743413281187',
      username: 'admin',
      avatar: '',
      name: '',
      roles: [],
      sex: 'Male',
      phone: '',
      email: '',
      status: 'Open',
      _id: 'string',
    },
    type: AdmintorsResultDto,
  })
  userInfo: AdmintorsResultDto;
}
