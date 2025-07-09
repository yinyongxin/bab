import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from '../auth/constants';
import {
  DefaultMantineColor,
  MantineRadius,
  MantineTheme,
} from '@mantine/core';

export interface AppThemeState extends Partial<MantineTheme> {}

export const initialAppThemeState: AppThemeState = {
  primaryColor: 'blue',
  defaultRadius: 'md',
  cursorType: 'pointer',
};

const appThemeSlice = createSlice({
  name: `${SLICE_BASE_NAME}/appTheme`,
  initialState: initialAppThemeState,
  reducers: {
    setPrimaryColor(
      state,
      action: PayloadAction<DefaultMantineColor | 'dark'>,
    ) {
      state.primaryColor = action.payload;
    },

    setDefaultRadius(state, action: PayloadAction<MantineRadius>) {
      state.defaultRadius = action.payload;
    },
  },
});

export const { setPrimaryColor, setDefaultRadius } = appThemeSlice.actions;
export default appThemeSlice.reducer;
