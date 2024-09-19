import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import dayjs from 'dayjs';
import { FORMAT } from '../../../config';
import { Document } from 'mongoose';

export class BaseTimeDocument extends Document {
  @Prop({
    type: Date,
    default: null,
    get: (time) => (time ? dayjs(time).format(FORMAT) : time),
  })
  @ApiProperty({
    type: Date,
    description: '删除时间',
    default: null,
    readOnly: true,
    required: false,
  })
  /** 时间删除 */
  deletedTime: Date;

  @Prop({
    type: Date,
    default: Date.now,
    get: (time) => dayjs(time).format(FORMAT),
  })
  @ApiProperty({ type: Date, description: '创建日期', default: Date.now() })
  /** 创建日期 */
  createdTime: Date;

  @Prop({
    type: Date,
    default: Date.now,
    get: (time) => dayjs(time).format(FORMAT),
  })
  @ApiProperty({ type: Date, description: '更新日期', default: Date.now() })
  /** 更新日期 */
  updatedTime: Date;
}
