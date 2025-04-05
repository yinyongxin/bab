import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from './constants';

export interface UserState {
  username?: string;
  phoneNumber?: string;
  email?: string;
  roles?: string[];
  avatar?: string;
}

const initialState: UserState = {
  username: '',
  email: '',
  roles: [],
  avatar: '',
};

const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload?.email;
      state.username = action.payload?.username;
      state.roles = action.payload?.roles;
      state.phoneNumber = action.payload?.phoneNumber;
      state.avatar = action.payload?.avatar;
    },
    setUserRole(state, action) {
      state.roles = action.payload.roles;
    },
    setUserName(state, action) {
      state.username = action.payload;
    },
  },
});

export const { setUser, setUserRole, setUserName } = userSlice.actions;
export default userSlice.reducer;
