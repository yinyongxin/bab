import { filesControllerUploadFile } from '@/client';
import { Option } from '@/@types';

export const getFilePath = (path?: string) => {
  if (!path) {
    return '';
  }
  if (path.startsWith('http')) {
    return path;
  }
  return `${path}`;
};

export const getPageTotal = (
  total: number,
  pageSize: number,
  options?: {
    defaultValue?: number;
  },
): number => {
  // 校验 total 和 pageSize 是否为有效值
  if (total === 0) {
    return options?.defaultValue || 1;
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

export function convertToObject<T = any>(arr: Option<T>[]) {
  return arr.reduce(
    (acc, cur) => {
      acc[cur.value] = cur;
      return acc;
    },
    //@ts-ignore
    {} as Record<T, Option<T>>,
  );
}

export const waitTime = (time: number = 5000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
