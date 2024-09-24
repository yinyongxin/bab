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
    minlength: 5,
    maxlength: 10,
  })
  // swagger
  @ApiProperty({ required: true, description: '角色名称', example: 'role' })
  name: string;

  /**
   * 角色描述
   */
  @Prop({
    required: false,
    default: null,
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
   * 角色名称
   */
  @Prop({
    required: false,
    default: null,
  })
  // swagger
  @ApiProperty({
    required: false,
    description: '图标',
    example: '',
  })
  icon: string;
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
