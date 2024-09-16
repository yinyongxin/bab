import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class IdDto {
  @ApiProperty({
    required: true,
    description: '唯一值',
  })
  id: string;
}
