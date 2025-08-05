import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../global';
import { ApiProperty } from '@nestjs/swagger';
@Schema()
export class Files extends BaseDocument {
  /**
   * 原始文件名
   */
  @Prop({
    required: true,
    minlength: 1,
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '原始文件名',
    example: 'image/jpeg',
  })
  originalname: string;

  /**
   * 唯一文件名
   */
  @Prop({
    unique: true,
    required: true,
    minlength: 1,
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '唯一文件名',
    example: 'uniqueName',
  })
  uniquedName: string;

  /**
   * 文件类型
   */
  @Prop({
    required: true,
    minlength: 1,
  })
  // swagger
  @ApiProperty({ required: true, description: '文件类型', example: 'fileName' })
  mimetype: string;

  /**
   * 文件大小
   */
  @Prop({
    required: true,
    minlength: 1,
  })
  // swagger
  @ApiProperty({ required: true, description: '文件大小', example: 1024 })
  size: number;

  @Prop({
    required: true,
    minlength: 1,
  })
  // swagger
  @ApiProperty({
    required: true,
    description: '文件路径',
    example: '/file/fileName.png',
  })
  path: string;
}

export const FilesSchema = SchemaFactory.createForClass(Files);

FilesSchema.set('toJSON', {
  getters: true,
});

export const FilesMongooseModule = MongooseModule.forFeature([
  {
    name: Files.name,
    schema: FilesSchema,
  },
]);
