import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from '../auth/constants';
import { DefaultMantineColor, MantineTheme } from '@mantine/core';

export interface AppThemeState extends Partial<MantineTheme> {}

const initialState: AppThemeState = {
  primaryColor: 'blue',
};

const appThemeSlice = createSlice({
  name: `${SLICE_BASE_NAME}/appTheme`,
  initialState,
  reducers: {
    setPrimaryColor(
      state,
      action: PayloadAction<DefaultMantineColor | 'dark'>,
    ) {
      state.primaryColor = action.payload;
    },
  },
});

export const { setPrimaryColor } = appThemeSlice.actions;
export default appThemeSlice.reducer;
