import { setNewMessage } from '#utils/state/features/messagesSlice';
import { Chat, IChatMessage, INewMessage } from '#utils/types/types';
import { setMessages } from '#utils/state/features/messagesSlice';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { TypeConnection } from '#utils/types/types';
import { updateChat } from '#utils/state/features/chatSlice';

export const receiveMessages = (ws: WebSocket, dispatch: Dispatch<UnknownAction>, chatId?: string) => {
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data) as INewMessage;
    switch(data.type as TypeConnection) {
    case 'get_last_messages': {
      const data = JSON.parse(event.data) as Chat;
      dispatch(updateChat(data));
    } break;
    case 'initial_message': {
      const data = JSON.parse(event.data) as IChatMessage;
      dispatch(setMessages(data.messages));
    } break;
    case 'new_message': {
      if (data.chat_id === chatId) dispatch(setNewMessage(data));
    } break;
    default: break;
    }
  };
};