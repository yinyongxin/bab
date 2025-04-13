import { OmitType, PickType, ApiProperty, PartialType } from '@nestjs/swagger';
import { Admintors } from '../../../../mongo/base';
import { DateTimeRangeDto } from 'src/dtos';

class AdmintorsFilterFuzzyFieldsDto extends PartialType(
  PickType(Admintors, ['name', 'username', 'email']),
) {}
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
    type: AdmintorsFilterFuzzyFieldsDto,
  })
  fuzzyFields?: Partial<Pick<Admintors, 'name' | 'username' | 'email'>>;
}
