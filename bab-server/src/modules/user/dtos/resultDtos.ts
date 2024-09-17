import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { ResultPaginationDto } from 'src/dto';
import { User } from 'src/schemas/user/index.';

export class ResultUserDto extends OmitType(User, [
  'password',
  'deletedTime',
]) {}

export class UserPaginationQueryResultDto<D> extends ResultPaginationDto {
  @ApiProperty({
    required: true,
    description: '所有数量',
    type: [ResultUserDto],
  })
  list: ResultUserDto[];
}
