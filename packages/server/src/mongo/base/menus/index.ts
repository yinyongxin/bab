import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../global';
import { ApiProperty } from '@nestjs/swagger';
import { MenuTypeEnum } from 'src/enums';

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
    default: '',
    maxlength: 1000,
  })
  // swagger
  @ApiProperty({
    required: false,
    description: '菜单名称',
    example: '我是菜单描述',
  })
  description: string;

  /**
   * 菜单路径&功能区域标识
   */
  @Prop({
    unique: true,
    required: true,
    default: '',
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '菜单路径&功能区域标识',
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

  @Prop({
    required: true,
    default: '',
    enum: MenuTypeEnum,
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '菜单类型',
    example: MenuTypeEnum.DIRECTORY,
    enum: MenuTypeEnum,
    enumName: 'MenuTypeEnum',
  })
  menuType: string;

  @Prop({
    required: true,
    default: false,
    type: Boolean,
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '是否隐藏',
  })
  isHide: boolean;
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
