import { LayoutTypes } from '@/@types/layout';

export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  enableMock: boolean;
  locale: string;
  layoutType: LayoutTypes;
  fileBaseUrl: string;
};

const appConfig: AppConfig = {
  layoutType: LayoutTypes.DeckedSideBar,
  apiPrefix: '',
  authenticatedEntryPath: '/dashboard',
  unAuthenticatedEntryPath: '/sign-in',
  enableMock: false,
  locale: 'en',
  // fileBaseUrl: 'http://localhost:3000',
  fileBaseUrl: 'https://c1d4zddj-fyanusd7-tu56zly4ugmw.vcb3.mcprev.cn/',
};

export default appConfig;
