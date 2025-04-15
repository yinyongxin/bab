import useAppConfig from '@/store/hook/useAppConfig';

const getFilePath = (fileBaseUrl: string, path?: string) => {
  if (!path) {
    return '';
  }
  if (path.startsWith('http')) {
    return path;
  }
  return `${fileBaseUrl}${path}`;
};

const useTools = () => {
  const [{ fileBaseUrl }] = useAppConfig();
  return {
    getFilePath: (path?: string) => getFilePath(fileBaseUrl, path),
  };
};
export default useTools;
