import { IMessages } from '#utils/types/types';
import { createSlice } from '@reduxjs/toolkit';

export interface IChatsProps {
    targetId: string;
    lastMessage?: string;
    targetName: string;
    chatId: string;
    messages?: IMessages[]
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
      state.data = action.payload;
    },
    updateChat: (state, action) => {
      const messages = action.payload.messages;
      const chat_id = action.payload.chat_id;
      const index = state.data.findIndex((item) => item.chatId === chat_id);
      if (index !== -1) {
        state.data[index].lastMessage = messages[0].message;
      }
    }
  },
});

export const { setChats, updateChat } = chatSlice.actions;

export default chatSlice.reducer;
