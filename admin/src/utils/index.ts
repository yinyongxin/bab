import appConfig from '@/configs/app.config';

export const getFilePath = (path: string) => {
  return `${appConfig.fileBaseUrl}${path}`;
};
