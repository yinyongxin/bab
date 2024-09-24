import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
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
  })
  // swagger
  @ApiProperty({ required: true, description: '角色名称', example: 'username' })
  name: string;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);

RolesSchema.set('toJSON', {
  getters: true,
});

export const AdmintorMongooseModule = MongooseModule.forFeature([
  {
    name: Roles.name,
    schema: RolesSchema,
  },
]);
