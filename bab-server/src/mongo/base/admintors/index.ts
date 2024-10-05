import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../global';
import { ApiProperty } from '@nestjs/swagger';
import { AdmintorStatusEnum } from '../../../enums';

@Schema()
export class Admintors extends BaseDocument {
  /**
   * 管理人员名称
   */
  @Prop({
    unique: true,
    required: true,
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '管理人员名称',
    example: 'admin',
  })
  username: string;

  /**
   * 密码
   */
  @Prop({
    required: true,
  })
  // swaggerF
  @ApiProperty({ required: true, description: '密码', example: '123456' })
  password: string;

  /**
   * 头像
   */
  @Prop({
    default: undefined,
  })
  // swagger
  @ApiProperty({ required: false, description: '头像', example: '' })
  avatar: string;

  /**
   * 姓名
   */
  @Prop({
    default: undefined,
  })
  // swagger
  @ApiProperty({ required: false, description: '姓名', example: '' })
  name: string;

  /**
   * 年龄
   */
  @Prop({
    min: 0,
    default: 0,
  })
  // swagger
  @ApiProperty({ required: false, description: '年龄', example: '0' })
  age: number;

  /**
   * 电话号码
   */
  @Prop({
    default: undefined,
  })
  // swagger
  @ApiProperty({ required: false, description: '电话号码', example: '' })
  phone: string;

  /**
   * 邮箱
   */
  @Prop({
    default: undefined,
  })
  // swagger
  @ApiProperty({ required: false, description: '邮箱', example: '' })
  email: string;

  @Prop({
    default: AdmintorStatusEnum.Open,
    required: true,
    enum: AdmintorStatusEnum,
  })
  @ApiProperty({
    description: '状态',
    example: AdmintorStatusEnum.Open,
    enum: AdmintorStatusEnum,
    // enumName: 'AdmintorStatus',
  })
  status: string;
}

export const AdmintorsSchema = SchemaFactory.createForClass(Admintors);

AdmintorsSchema.set('toJSON', {
  getters: true,
});

export const AdmintorsMongooseModule = MongooseModule.forFeature([
  {
    name: Admintors.name,
    schema: AdmintorsSchema,
  },
]);
