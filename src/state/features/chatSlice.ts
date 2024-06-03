import { createSlice } from '@reduxjs/toolkit';

export interface IChatsProps {
    targetId: string;
    lastMessage?: string;
    targetName: string;
    chatId: string;
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
    },
    updateChat: (state, action) => {
      const { chat_id, messages } = action.payload.chats;
      const index = state.data.findIndex((item) => item.chatId === chat_id);
      if (index !== -1) {
        state.data[index].lastMessage = messages[0].message;
      }
    }
  },
});

export const { setChats, updateChat } = chatSlice.actions;

export default chatSlice.reducer;
