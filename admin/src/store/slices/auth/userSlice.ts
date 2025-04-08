import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_BASE_NAME } from './constants';
import { AdmintorsResultDto } from '@/client';
import { extend } from 'dayjs';

export interface UserState extends Partial<AdmintorsResultDto> {}

export const initialUserState: UserState = {
  username: '',
  email: '',
  roles: [],
  avatar: '',
  phone: '',
  createdTime: undefined,
  updatedTime: undefined,
  status: 'Open',
  _id: '',
};

const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState: initialUserState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload?.email;
      state.username = action.payload?.username;
      state.roles = action.payload?.roles;
      state.phone = action.payload?.phone;
      state.avatar = action.payload?.avatar;
      state._id = action.payload?._id;
      state.createdTime = action.payload?.createdTime;
      state.updatedTime = action.payload?.updatedTime;
      state.status = action.payload?.status;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
