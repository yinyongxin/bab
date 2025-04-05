import { combineReducers } from '@reduxjs/toolkit';
import session, { SessionState } from './sessionSlice';
import user, { UserState } from './userSlice';
import userInfo, { UserInfoState } from './userInfoSlice';
import menus, { MenusState } from './menusSlice';

const reducer = combineReducers({
  session,
  user,
  userInfo,
  menus,
});

export type AuthState = {
  session: SessionState;
  user: UserState;
  userInfo: UserInfoState;
  menus: MenusState;
};

export * from './sessionSlice';
export * from './userSlice';
export * from './userInfoSlice';
export * from './menusSlice';

export default reducer;
