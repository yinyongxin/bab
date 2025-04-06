import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../global';
import { ApiProperty } from '@nestjs/swagger';
import { AdmintorStatusEnum, SexEnum } from '../../../enums';
import { ObjectId, Types } from 'mongoose';

@Schema()
export class Admintors extends BaseDocument {
  /**
   * 管理人员名称
   */
  @Prop({
    unique: true,
    required: true,
    minlength: 1,
    maxlength: 20,
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
  // swagger
  @ApiProperty({ required: true, description: '密码', example: '123456' })
  password: string;

  /**
   * 头像
   */
  @Prop({
    default: '',
  })
  // swagger
  @ApiProperty({ required: false, description: '头像', example: '' })
  avatar: string;

  /**
   * 姓名
   */
  @Prop({
    default: '',
  })
  // swagger
  @ApiProperty({ required: false, description: '姓名', example: '' })
  name: string;

  /**
   * 角色
   */
  @Prop({
    isRequired: true,
    type: Types.ObjectId,
    minlength: 1,
    set: (v: string[]) => v.map((item) => new Types.ObjectId(item)),
  })
  // swagger
  @ApiProperty({ required: true, description: '角色', example: [] })
  roles: ObjectId[];

  /**
   * 性别
   */
  @Prop({
    default: SexEnum.Male,
    enum: SexEnum,
  })
  // swagger
  @ApiProperty({
    required: false,
    description: '性别',
    example: SexEnum.Male,
    enum: SexEnum,
    enumName: 'SexEnum',
  })
  sex: string;

  /**
   * 电话号码
   */
  @Prop({
    default: '',
  })
  // swagger
  @ApiProperty({ required: false, description: '电话号码', example: '' })
  phone: string;

  /**
   * 邮箱
   */
  @Prop({
    default: '',
    unique: true,
  })
  // swagger
  @ApiProperty({ required: true, description: '邮箱', example: '' })
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
  })
  status: 'Open' | 'Close';
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
