import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from './constants';

export interface AppConfigState {
  name: string;
}

const initialState: AppConfigState = {
  name: 'Admin',
};

const appConfigSlice = createSlice({
  name: `${SLICE_BASE_NAME}/appConfig`,
  initialState,
  reducers: {
    setAppConfig(state, action: PayloadAction<AppConfigState>) {
      state.name = action.payload?.name;
    },
  },
});

export const { setAppConfig } = appConfigSlice.actions;
export default appConfigSlice.reducer;
