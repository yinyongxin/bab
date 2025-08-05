import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from '../auth/constants';
import { LayoutTypes } from '@/@types/layout';

export interface AppConfigState {
  layoutType: LayoutTypes;
  contentWidth: number;
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
  contentWidth: 100,
  name: 'Admin',
  version: '1.0.0',
  logo: '/image/png/2025040622/0b444c0d-5c82-41ee-a41b-e077d9ac8f4f.png',
  emptyOrder: '/default/Empty-Order--Streamline-Bruxelles.png',
  apiPrefix: '',
  authenticatedEntryPath: '/home',
  unAuthenticatedEntryPath: '/sign-in',
  locale: 'cn',
  fileBaseUrl: 'http://localhost:3000',
  // fileBaseUrl: 'https://fantastic-trout-ppxx6g5xvxj3q5-3000.app.github.dev',
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
