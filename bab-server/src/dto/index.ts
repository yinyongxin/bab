import { ApiProperty } from '@nestjs/swagger';

export class IdDto {
  @ApiProperty({
    required: true,
    description: '唯一值',
  })
  id: string;
}
