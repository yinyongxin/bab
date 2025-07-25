import { combineReducers } from '@reduxjs/toolkit';
import session, { SessionState } from './sessionSlice';
import user, { UserState } from './userSlice';
import menus, { MenusState } from './menusSlice';

const reducer = combineReducers({
  session,
  user,
  menus,
});

export type AuthState = {
  session: SessionState;
  user: UserState;
  menus: MenusState;
};

export * from './sessionSlice';
export * from './userSlice';
export * from './menusSlice';

export default reducer;
