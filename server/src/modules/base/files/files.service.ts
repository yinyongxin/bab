import { Injectable, InternalServerErrorException } from '@nestjs/common';
import path from 'path';
import fs from 'fs/promises';
import dayjs from 'dayjs';

@Injectable()
export class FilesService {
  constructor() {}
  async uploadFile(file: Express.Multer.File) {
    const { mimetype, originalname } = file;
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
    try {
      // 将文件写入目录
      await fs.writeFile(
        path.join(directoryPath, `/${originalname}`),
        file.buffer,
      );
    } catch {
      // 处理文件写入错误
      throw new InternalServerErrorException('文件上传失败');
    }
    return {
      url: `/${dirPath}/${originalname}`,
    };
  }
}
