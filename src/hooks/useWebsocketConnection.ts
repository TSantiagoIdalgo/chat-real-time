import { setChats, updateChat } from '#utils/state/features/chatSlice';
import { Initial_chats, TypesResponse } from '#utils/types/types';
import { useState, useEffect, useRef } from 'react';
import { AppState } from '#utils/state/state';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChatId, setChatId, setTyping } from '#utils/state/features/writeSlice';
import { setMessages, setNewMessage } from '#utils/state/features/messagesSlice';

export const useWebSocketConnection = (uri: string) => {
  const [connecting, setConnecting] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    if (!user.data) return;
    const connectWebSocket = () => {
      if (!ws.current) ws.current = new WebSocket(uri);
      setConnecting(true);

      ws.current.onopen = () => {
        console.log('WebSocket connection established');
        setConnecting(false);
      };

      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        switch(data.type as TypesResponse) {
        case TypesResponse.INITIAL_CHATS: {
          const data = JSON.parse(e.data) as Initial_chats;
          const response = data.chat.map((chat) => ({
            targetId: chat.usersInChat.find((targetId) => targetId !== user.data.email),
            lastMessage: chat.messages[0] ? chat.messages[0].message : '',
            targetName: chat.users.find((targetUser) => targetUser.email !== user.data.email)?.name,
            chatId: chat.chat_id
          }));
          dispatch(setChats(response));
        } break;
        case TypesResponse.INITIAL_MESSAGE: return dispatch(setMessages(data.chat.messages));
        case TypesResponse.NEW_MESSAGE: return dispatch(setNewMessage(data.message));
        case TypesResponse.UPDATED_CHATS: return dispatch(updateChat(data.chat));
        case TypesResponse.TYPING: {
          dispatch(setChatId(data.chat_id));
          return dispatch(setTyping(true));
        }
        case TypesResponse.STOP_TYPING: {
          dispatch(deleteChatId(data.chat_id));
          return dispatch(setTyping(false));
        }
        }
      };

      ws.current.onclose = () => {
        console.log('WebSocket connection closed');
        setConnecting(false);
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error', error);
        setConnecting(false);
      };
    };

    connectWebSocket();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws.current, uri, user.data]);
  return { ws, connecting };
};