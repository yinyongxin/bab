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
  fileBaseUrl: 'https://dxaui78l-d3cpdocj-82qa716erid4.vcb3.mcprev.cn/',
};

export default appConfig;
