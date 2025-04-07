import { filesControllerUploadFile } from '@/client';
import appConfig from '@/configs/app.config';

export const getFilePath = (path?: string) => {
  if (!path) {
    return '';
  }
  if (path.startsWith('http')) {
    return path;
  }
  return `${appConfig.fileBaseUrl}${path}`;
};

export const getPageTotal = (total?: number, pageSize?: number): number => {
  // 校验 total 和 pageSize 是否为有效值
  if (typeof total !== 'number' || total <= 0) {
    return 0;
  }
  const validPageSize =
    typeof pageSize === 'number' && pageSize > 0 ? pageSize : 10; // 默认值为10
  return Math.ceil(total / validPageSize);
};

export const uploadFile = async (file?: File | null) => {
  if (!file) {
    return;
  }
  const newFile = new File([file], encodeURI(file.name), {
    type: file.type,
  });
  const res = await filesControllerUploadFile({
    body: {
      file: newFile,
    },
  });
  return res.data;
};
