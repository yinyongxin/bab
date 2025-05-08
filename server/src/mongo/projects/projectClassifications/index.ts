import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../global';
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from 'src/enums';

@Schema()
export class ProjectClassifications extends BaseDocument {
  /**
   * 分类名称
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
    description: '分类名称',
    example: 'classificationName',
  })
  name: string;

  /**
   * 分类描述
   */
  @Prop({
    required: true,
    default: '',
    maxlength: 10000,
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '分类名称',
    example: '我是分类描述',
  })
  description: string;

  /**
   * 排序
   */
  @Prop({
    default: 0,
  })
  // swagger
  @ApiProperty({ required: true, description: '用作分类排序', example: 0 })
  sort: number;

  /**
   * 分类图标
   */
  @Prop({
    required: true,
    default: '',
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '分类图片',
    example: '',
  })
  picture: string;

  /**
   * 父级分类
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
    enum: StatusEnum,
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '分类类型',
    example: StatusEnum.Open,
    enum: StatusEnum,
    enumName: 'StatusEnum',
  })
  status: string;
}

export const ProjectClassificationsSchema = SchemaFactory.createForClass(
  ProjectClassifications,
);

ProjectClassificationsSchema.set('toJSON', {
  getters: true,
});

export const ProjectClassificationsMongooseModule = MongooseModule.forFeature([
  {
    name: ProjectClassifications.name,
    schema: ProjectClassificationsSchema,
  },
]);
