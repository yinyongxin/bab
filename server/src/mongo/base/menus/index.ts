import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../global';
import { ApiProperty } from '@nestjs/swagger';
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
   * 菜单唯一键
   */
  @Prop({
    unique: true,
    required: true,
    minlength: 1,
    maxlength: 100,
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '菜单唯一键',
    example: 'uniqueKey',
  })
  uniqueKey: string;

  /**
   * 菜单描述
   */
  @Prop({
    required: false,
    default: '',
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
    default: '',
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '菜单路径',
    example: '',
  })
  path: string;

  /**
   * 排序
   */
  @Prop({
    default: 0,
  })
  // swagger
  @ApiProperty({ required: true, description: '用作菜单排序', example: 0 })
  sort: number;

  /**
   * 页面权限
   */
  @Prop({
    required: true,
    type: Array(PageAuthorityEnum),
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
    required: true,
    description: '页面权限',
    example: () => [
      PageAuthorityEnum.Create,
      PageAuthorityEnum.Delete,
      PageAuthorityEnum.Update,
      PageAuthorityEnum.Query,
    ],
    enum: PageAuthorityEnum,
    isArray: true,
    enumName: 'PageAuthorityEnum',
  })

  /**
   * 菜单图标
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
   * 父级菜单
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
