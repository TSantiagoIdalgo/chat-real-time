import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '#utils/types/types';

interface initialState {
  data: {
    user: IUser
  } | null
}

const initialState: initialState = {
  data: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
