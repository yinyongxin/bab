import { LayoutTypes } from '@/@types/layout';

export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  locale: string;
  layoutType: LayoutTypes;
  fileBaseUrl: string;
  name: string;
  logo: string;
  version: string;
  dateTimeFormat: string;
};

const appConfig: AppConfig = {
  // layoutType: LayoutTypes.DeckedSideBar,
  layoutType: LayoutTypes.SimpleSideBar,
  name: 'Admin',
  version: '1.0.0',
  logo: '/logo/logo-light-full.svg',
  apiPrefix: '',
  authenticatedEntryPath: '/nothingFound',
  unAuthenticatedEntryPath: '/sign-in',
  locale: 'cn',
  // fileBaseUrl: 'http://localhost:3000',
  fileBaseUrl: 'https://524t2k5i-zc7r4al5-liwcr6tx7um0.vcb3.mcprev.cn/',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
};

export default appConfig;
