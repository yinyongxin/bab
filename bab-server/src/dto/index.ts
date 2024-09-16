import { ApiProperty } from '@nestjs/swagger';

export class QueryIdDto {
  @ApiProperty({
    required: true,
    description: '唯一值',
  })
  id: string;
}
