import { useWebSocketConnection } from './useWebsocketConnection';
import { sendConnectMessage } from '#utils/utils/websocket-messages';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppState } from '#utils/state/state';
import { IChatConnection } from '#utils/types/types';
import { setMessages } from '#utils/state/features/messagesSlice';

export const useGetMessages = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: AppState) => state.user);
  const targetId = useSelector((state: AppState) => state.targetUser);
  const { messages } = useSelector((state: AppState) => state.messages);
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const webSocketUrl = `${import.meta.env.VITE_APP_WS_URL}?token=${token}`;
  const { ws } = useWebSocketConnection(webSocketUrl);

  useEffect(() => {
    if (!ws) return;
    ws.send(JSON.stringify(sendConnectMessage(userId.data.email, targetId.data.targetId)));
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as IChatConnection;
      if (data.type === 'initial_message') {
        dispatch(setMessages(data.messages));
      }
    };

  }, [targetId.data.targetId, userId.data.email, ws, dispatch]);

  return { messages };
};