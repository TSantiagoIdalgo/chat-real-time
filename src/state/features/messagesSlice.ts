// webSocketSlice.js
import { IMessages } from '#utils/types/types';
import { createSlice } from '@reduxjs/toolkit';

export interface IChatsProps {
    targetId?: string;
    lastMessage?: string;
    targetName: string;
    chatId: string;
  }

interface IState {
    messages: IMessages[]
}

const initialState: IState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setNewMessage: (state, action) => {
      state.messages.push(action.payload);
    }
  },
});

export const { setMessages, setNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
