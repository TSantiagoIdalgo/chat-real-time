// webSocketSlice.js
import { createSlice } from '@reduxjs/toolkit';

export interface ITargetUserProps {
    targetId: string;
    lastMessage?: string;
    targetName: string;
    chatId: string;
}

interface IState {
    data: ITargetUserProps | null
}

const initialState: IState = {
  data: null,
};

const messagesSlice = createSlice({
  name: 'targetUser',
  initialState,
  reducers: {
    setTargetUser: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const { setTargetUser } = messagesSlice.actions;

export default messagesSlice.reducer;
