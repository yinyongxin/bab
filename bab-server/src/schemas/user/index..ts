import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Base } from '../base';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Base {
  /**
   * 头像
   */
  @Prop({
    default: null,
  })
  @ApiProperty({ type: String, description: '头像' })
  avatar: string;

  /**
   * 用户名
   */
  @Prop({
    unique: true,
    required: true,
  })
  @ApiProperty({ type: String, required: true })
  username: string;

  /**
   * 密码
   */
  @Prop({
    required: true,
  })
  @ApiProperty({ type: String, required: true })
  password: string;

  /**
   * 姓名
   */
  @Prop({
    default: null,
  })
  name: string;

  /**
   * 邮箱
   */
  @Prop({
    default: null,
  })
  email: string;

  /**
   * 年龄
   */
  @Prop({
    min: 0,
    default: 0,
  })
  age: number;

  /**
   * 电话号码
   */
  @Prop({
    default: null,
  })
  phone: string;

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
