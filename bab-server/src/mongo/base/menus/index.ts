import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../global';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PageAuthorityEnum } from '../../../enums';

@Schema()
export class Menus extends BaseDocument {
  /**
   * 菜单名称
   */
  @Prop({
    unique: true,
    required: true,
    minlength: 1,
    maxlength: 20,
  })
  // swagger
  @ApiProperty({ required: true, description: '菜单名称', example: 'menuName' })
  name: string;

  /**
   * 菜单描述
   */
  @Prop({
    required: false,
    default: null,
    maxlength: 10000,
  })
  // swagger
  @ApiProperty({
    required: false,
    description: '菜单名称',
    example: '我是菜单描述',
  })
  description: string;

  /**
   * 菜单路径
   */
  @Prop({
    required: false,
    default: null,
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '菜单路径',
    example: null,
  })
  path: string;

  /**
   * 页面权限
   */
  @Prop({
    required: false,
    enum: PageAuthorityEnum,
    type: Array,
    default: (data) => {
      return data.path
        ? [
            PageAuthorityEnum.Create,
            PageAuthorityEnum.Delete,
            PageAuthorityEnum.Update,
            PageAuthorityEnum.Query,
          ]
        : [];
    },
  })
  // swagger
  @ApiProperty({
    required: false,
    description: '页面权限',
    example: [
      PageAuthorityEnum.Create,
      PageAuthorityEnum.Delete,
      PageAuthorityEnum.Update,
      PageAuthorityEnum.Query,
    ],
    type: Array,
    enum: PageAuthorityEnum,
  })
  pageAuthority: PageAuthorityEnum[];

  /**
   * 菜单图标
   */
  @Prop({
    required: false,
    default: (data) => {
      return !data.path ? 'defaultIcon' : null;
    },
  })
  // swagger
  @ApiProperty({
    required: false,
    description: '图标',
    example: '',
  })
  icon: string;

  /**
   * 父级菜单
   */
  @Prop({
    required: false,
    default: null,
    type: String,
  })
  // swagger
  @ApiProperty({
    required: false,
    description: '图标',
    example: null,
  })
  parent: string;
}

export const MenusSchema = SchemaFactory.createForClass(Menus);

MenusSchema.set('toJSON', {
  getters: true,
});

export const MenusMongooseModule = MongooseModule.forFeature([
  {
    name: Menus.name,
    schema: MenusSchema,
  },
]);
