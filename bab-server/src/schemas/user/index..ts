import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Base } from '../base';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Base {
  /**
   * 用户名
   */
  @Prop({
    unique: true,
    required: true,
  })
  // swagger
  @ApiProperty({ required: true, description: '用户名' })
  username: string;

  /**
   * 密码
   */
  @Prop({
    required: true,
  })
  // swaggerF
  @ApiProperty({ required: true, description: '密码' })
  password: string;

  /**
   * 头像
   */
  @Prop({
    default: null,
  })
  // swagger
  @ApiProperty({ description: '头像' })
  avatar: string;

  /**
   * 姓名
   */
  @Prop({
    default: null,
  })
  // swagger
  @ApiProperty({ description: '姓名' })
  name: string;

  /**
   * 年龄
   */
  @Prop({
    min: 0,
    default: 0,
  })
  // swagger
  @ApiProperty({ description: '年龄' })
  age: number;

  /**
   * 电话号码
   */
  @Prop({
    default: null,
  })
  // swagger
  @ApiProperty({ description: '电话号码' })
  phone: string;

  /**
   * 邮箱
   */
  @Prop({
    default: null,
  })
  // swagger
  @ApiProperty({ description: '邮箱' })
  email: string;

  /** 角色类型 */
  @Prop({
    type: Array,
    default: [],
  })
  @ApiProperty({ type: Array, description: '角色列表' })
  role: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.set('toJSON', {
//   getters: true,
// });

export const UserMongooseModule = MongooseModule.forFeature([
  {
    name: User.name,
    schema: UserSchema,
  },
]);
