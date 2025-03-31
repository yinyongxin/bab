import { Injectable } from '@nestjs/common';

import { getDirectories, getFiles } from '../../../utils';
import path from 'path';
import fs from 'fs';

@Injectable()
export class FilesService {
  constructor() {}
  async uploadFile(file: Express.Multer.File) {
    console.log(file);
    const { mimetype } = file;
    fs.writeFileSync(
      path.join(__dirname, `../static/files/20250331/${file.originalname}`),
      file.buffer,
    );
    // 获取文件路径
    const directoryPath = path.join(__dirname, `../static/files/${mimetype}`);
    console.log('Directory Path:', directoryPath);
    const directories = await getDirectories(directoryPath);
    console.log('Directories:', directories);
    if (directories.length === 0) {
      fs.mkdirSync(directoryPath);
    }

    const files = await getFiles(path.join(directoryPath, '20250331'));
    console.log('Files:', directoryPath.concat('/20250331'), files);
  }
}
