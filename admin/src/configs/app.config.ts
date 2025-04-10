import { LayoutTypes } from '@/@types/layout';

export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  locale: string;
  layoutType: LayoutTypes;
  fileBaseUrl: string;
  emptyOrder: string;
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
  logo: '/image/png/2025040622/0b444c0d-5c82-41ee-a41b-e077d9ac8f4f.png',
  emptyOrder: '/images/Empty-Order--Streamline-Bruxelles.png',
  apiPrefix: '',
  authenticatedEntryPath: '/home',
  unAuthenticatedEntryPath: '/sign-in',
  locale: 'cn',
  // fileBaseUrl: 'http://localhost:3000/',
  fileBaseUrl: 'https://9lhcouic-d9xa14zx-bh0darn1sse0.vcb3.mcprev.cn/',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
};

export default appConfig;
