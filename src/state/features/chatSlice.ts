import { createSlice } from '@reduxjs/toolkit';

export interface IChatsProps {
    targetId?: string;
    lastMessage?: string;
  }

interface IState {
    data: IChatsProps[]
}

const initialState: IState = {
  data: [],
};

const chatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    setChats: (state, action) => {
      if (Array.isArray(action.payload.chats)) state.data = action.payload.chats;
      else state.data = action.payload;
    }
  },
});

export const { setChats } = chatSlice.actions;

export default chatSlice.reducer;
