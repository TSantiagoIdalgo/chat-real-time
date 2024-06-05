import { createSlice } from '@reduxjs/toolkit';

export interface WrtieState {
  data: {
    loading: boolean
    text: string,
    chatIds: string[]
  }
}

const initialState: WrtieState = {
  data: {
    loading: false,
    text: '',
    chatIds: []
  }
};

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    setWrite: (state, action) => {
      state.data.text = action.payload;
    },
    setTyping: (state, action) => {
      state.data.loading = action.payload;
    },
    setChatId: (state, action) => {
      state.data.chatIds.push(action.payload);
    },
    deleteChatId: (state, action) => {
      state.data.chatIds = state.data.chatIds.filter(id => id !== action.payload);
    }
  },
});

export const { setWrite, setTyping, setChatId, deleteChatId } = writeSlice.actions;

export default writeSlice.reducer;
