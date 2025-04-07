import { Injectable, InternalServerErrorException } from '@nestjs/common';
import path from 'path';
import fs from 'fs/promises';
import dayjs from 'dayjs';
import { FilesQueryFilterDto } from './dto';
import { Model } from 'mongoose';
import { Files } from '../../../mongo/base/files';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { PaginationDto } from 'src/dtos';
import { queryPagination } from 'src/mongo/tools';

@Injectable()
export class FilesService {
  constructor(@InjectModel(Files.name) private filesModel: Model<Files>) {}
  async uploadFile(file: Express.Multer.File) {
    console.log(file);
    const { mimetype, originalname } = file;
    const uuid = randomUUID();
    const uniquedName = `${uuid}.${originalname.split('.').pop()}`;

    const time = dayjs().format('YYYYMMDDHH');
    const dirPath = `${mimetype}/${time}`;

    // 获取文件路径
    const directoryPath = path.join(__dirname, `../static/${dirPath}`);
    try {
      // 检查目录是否存在
      await fs.access(directoryPath, fs.constants.F_OK);
    } catch {
      // 如果目录不存在，则创建目录
      await fs.mkdir(directoryPath, { recursive: true });
    }
    const pathUrl = `/${dirPath}/${uniquedName}`;
    try {
      // 将文件写入目录
      await fs.writeFile(
        path.join(directoryPath, `/${uniquedName}`),
        file.buffer,
      );
      const fileCreate = await this.filesModel.create({
        mimetype,
        originalname,
        path: pathUrl,
        size: file.size,
        uniquedName,
      });
      fileCreate.save();
    } catch (error) {
      console.error(error);
      // 处理文件写入错误
      throw new InternalServerErrorException('文件上传失败');
    }
    return {
      url: pathUrl,
    };
  }

  async getPaginationList(
    pagination: PaginationDto,
    filter: FilesQueryFilterDto,
  ) {
    const queryPaginationRes = await queryPagination(
      this.filesModel,
      pagination,
      filter,
    );

    return {
      ...queryPaginationRes,
      ...pagination,
    };
  }
}
