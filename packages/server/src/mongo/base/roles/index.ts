import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../global';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Roles extends BaseDocument {
  /**
   * 角色名称
   */
  @Prop({
    unique: true,
    required: true,
    minlength: 1,
    maxlength: 20,
  })
  // swagger
  @ApiProperty({ required: true, description: '角色名称', example: 'role' })
  name: string;

  /**
   * 角色描述
   */
  @Prop({
    required: false,
    default: '',
    maxlength: 100000,
  })
  // swagger
  @ApiProperty({
    required: false,
    description: '角色名称',
    example: '我是角色描述',
  })
  description: string;

  /**
   * 图标
   */
  @Prop({
    required: false,
    default: '',
  })
  // swagger
  @ApiProperty({
    required: false,
    description: '图标',
    example: '',
  })
  icon: string;

  /**
   * 图标
   */
  @Prop({
    required: true,
    default: [],
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '菜单',
    example: [],
  })
  menus: string[];
}

export const RolesSchema = SchemaFactory.createForClass(Roles);

RolesSchema.set('toJSON', {
  getters: true,
});

export const RolesMongooseModule = MongooseModule.forFeature([
  {
    name: Roles.name,
    schema: RolesSchema,
  },
]);
