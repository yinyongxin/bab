import { combineReducers } from '@reduxjs/toolkit';
import session, { SessionState } from './sessionSlice';
import user, { UserState } from './userSlice';
import appConfig, { AppConfigState } from './appConfigSlice';
import menus, { MenusState } from './menusSlice';

const reducer = combineReducers({
  session,
  user,
  appConfig,
  menus,
});

export type AuthState = {
  session: SessionState;
  user: UserState;
  userInfo: AppConfigState;
  menus: MenusState;
};

export * from './sessionSlice';
export * from './userSlice';
export * from './appConfigSlice';
export * from './menusSlice';

export default reducer;
