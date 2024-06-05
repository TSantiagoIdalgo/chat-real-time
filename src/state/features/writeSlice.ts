import { createSlice } from '@reduxjs/toolkit';

interface initialState {
  loading: boolean
  
}

const initialState: initialState = {
  loading: false
};

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    setWrite: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setWrite } = writeSlice.actions;

export default writeSlice.reducer;
