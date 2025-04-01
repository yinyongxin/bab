import appConfig from '@/configs/app.config';

export const getFilePath = (path: string) => {
  if (path.startsWith('http')) return path;
  return `${appConfig.fileBaseUrl}${path}`;
};
