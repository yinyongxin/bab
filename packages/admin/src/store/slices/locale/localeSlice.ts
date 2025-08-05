import { createSlice } from '@reduxjs/toolkit';

export type LocaleState = {
  currentLang: string;
};

const initialState: LocaleState = {
  currentLang: 'cn',
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.currentLang = action.payload;
    },
  },
});

export const { setLang } = localeSlice.actions;

export default localeSlice.reducer;
