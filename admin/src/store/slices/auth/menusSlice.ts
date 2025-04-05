import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from './constants';
import { MenusResultDto, TreeMenuDataDto } from '@/client';
import { NavigationTree } from '@/@types/navigation';

export interface MenusState {
  tree?: TreeMenuDataDto[];
  list: MenusResultDto[];
  navigationTree: NavigationTree[];
}

const initialState: MenusState = {
  tree: [],
  list: [],
  navigationTree: [],
};

const menusSlice = createSlice({
  name: `${SLICE_BASE_NAME}/menus`,
  initialState,
  reducers: {
    setMenus(state, action: PayloadAction<MenusState>) {
      state.tree = action.payload?.tree;
      state.list = action.payload?.list;
      state.navigationTree = action.payload?.navigationTree;
    },
  },
});

export const { setMenus } = menusSlice.actions;
export default menusSlice.reducer;
