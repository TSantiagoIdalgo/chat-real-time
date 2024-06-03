import { configureStore } from '@reduxjs/toolkit';
import { IMessages, IUser } from '#utils/types/types';
import messagesReducer, { IChatsProps } from './features/messagesSlice';
import chatReducer from './features/chatSlice';
import userReducer from './features/userSlice';
import targetUserReducer, { ITargetUserProps } from './features/targetChatSlice';

export interface AppState {
  messages: { messages: IMessages[] };
  chats: { data: IChatsProps[] }
  user: { data: IUser };
  targetUser: { data: ITargetUserProps };
}

export const store = configureStore({
  reducer: {
    chats: chatReducer,
    messages: messagesReducer,
    user: userReducer,
    targetUser: targetUserReducer
  }
});