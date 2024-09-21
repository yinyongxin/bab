import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseDocument } from '../../global';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Users extends BaseDocument {
  /**
   * 用户名
   */
  @Prop({
    unique: true,
    required: true,
  })
  // swagger
  @ApiProperty({ required: true, description: '用户名', example: 'username' })
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
    default: null,
  })
  // swagger
  @ApiProperty({ required: false, description: '头像', example: '' })
  avatar: string;

  /**
   * 姓名
   */
  @Prop({
    default: null,
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
    default: null,
  })
  // swagger
  @ApiProperty({ required: false, description: '电话号码', example: '' })
  phone: string;

  /**
   * 邮箱
   */
  @Prop({
    default: null,
  })
  // swagger
  @ApiProperty({ required: false, description: '邮箱', example: '' })
  email: string;

  /** 角色类型 */
  @Prop({
    type: Array,
    default: [],
  })
  @ApiProperty({ type: Array, description: '角色列表', example: [] })
  roles: Types.ObjectId[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.set('toJSON', {
  getters: true,
});

export const UserMongooseModule = MongooseModule.forFeature([
  {
    name: Users.name,
    schema: UsersSchema,
  },
]);
