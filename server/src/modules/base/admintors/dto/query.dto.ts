import { OmitType, PickType, ApiProperty, PartialType } from '@nestjs/swagger';
import { Admintors } from '../../../../mongo/base';
import { DateTimeRangeDto } from 'src/dtos';

export class AdmintorsFilterDto extends PartialType(
  OmitType(Admintors, [
    'password',
    'deletedTime',
    'createdTime',
    'updatedTime',
    'name',
    'username',
    'email',
  ]),
) {
  @ApiProperty({
    required: false,
    description: '时间范围',
    type: DateTimeRangeDto,
  })
  dateTimeRange?: DateTimeRangeDto;

  @ApiProperty({
    required: false,
    description: '模糊查询字段',
    type: PickType(Admintors, ['name', 'username', 'email']),
  })
  fuzzyFields?: Pick<Admintors, 'name' | 'username' | 'email'>;
}
