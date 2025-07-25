import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../global';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '../../../enums';

@Schema()
export class Departments extends BaseDocument {
  /**
   * 部门名称
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
    description: '部门名称',
    example: 'departmentName',
  })
  name: string;

  /**
   * 部门描述
   */
  @Prop({
    required: false,
    default: '',
    maxlength: 1000,
  })
  // swagger
  @ApiProperty({
    required: false,
    description: '部门名称',
    example: '我是部门描述',
  })
  description: string;

  /**
   * 排序
   */
  @Prop({
    default: 0,
  })
  // swagger
  @ApiProperty({ required: true, description: '用作部门排序', example: 0 })
  sort: number;

  /**
   * 部门图标
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
   * 父级部门
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
    default: StatusEnum.OPEN,
    required: true,
    enum: StatusEnum,
  })
  @ApiProperty({
    description: '状态',
    example: StatusEnum.OPEN,
    enum: StatusEnum,
    enumName: 'StatusEnum',
  })
  status: string;
}

export const DepartmentsSchema = SchemaFactory.createForClass(Departments);

DepartmentsSchema.set('toJSON', {
  getters: true,
});

export const DepartmentsMongooseModule = MongooseModule.forFeature([
  {
    name: Departments.name,
    schema: DepartmentsSchema,
  },
]);
