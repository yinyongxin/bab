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
  fileBaseUrl: 'http://localhost:3000',
  // fileBaseUrl: 'https://ilg4hjxi-k9br2qqv-9nytigm87m48.vcb3.mcprev.cn/',
};

export default appConfig;
