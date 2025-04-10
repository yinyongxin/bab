import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from '../auth/constants';
import { LayoutTypes } from '@/@types/layout';
import { DefaultMantineColor } from '@mantine/core';

export interface AppConfigState {
  layoutType: LayoutTypes;
  desktop: boolean;
  apiPrefix: string;
  authenticatedEntryPath: string;
  unAuthenticatedEntryPath: string;
  locale: string;
  fileBaseUrl: string;
  emptyOrder: string;
  name: string;
  logo: string;
  version: string;
  dateTimeFormat: string;
}

const initialState: AppConfigState = {
  layoutType: LayoutTypes.DeckedSideBar,
  desktop: true,
  name: 'Admin',
  version: '1.0.0',
  logo: '/image/png/2025040622/0b444c0d-5c82-41ee-a41b-e077d9ac8f4f.png',
  emptyOrder: '/images/Empty-Order--Streamline-Bruxelles.png',
  apiPrefix: '',
  authenticatedEntryPath: '/home',
  unAuthenticatedEntryPath: '/sign-in',
  locale: 'cn',
  // fileBaseUrl: 'http://localhost:3000',
  fileBaseUrl: 'https://9lhcouic-d9xa14zx-bh0darn1sse0.vcb3.mcprev.cn/',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
};

const appConfigSlice = createSlice({
  name: `${SLICE_BASE_NAME}/appConfig`,
  initialState,
  reducers: {
    setAppConfig(state, action: PayloadAction<Partial<AppConfigState>>) {
      const keys = Object.keys(action.payload) as (keyof AppConfigState)[];
      keys.forEach((key) => {
        const newValue = action.payload[key];
        state[key] = newValue as never;
      });
    },
  },
});

export const { setAppConfig } = appConfigSlice.actions;
export default appConfigSlice.reducer;
