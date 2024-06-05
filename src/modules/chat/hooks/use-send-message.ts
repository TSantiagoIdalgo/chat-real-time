import { useWebSocketConnection } from '#utils/hooks/useWebsocketConnection';
import { AppState } from '#utils/state/state';

import * as libs from '../libs/libs';

export const useSendMessage = () => {
  const [newMessage, setMessage] = libs.useState('');
  const chat = libs.useSelector((state: AppState) => state.targetUser);
  const user = libs.useSelector((state: AppState) => state.user);
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const wss_uri = `${import.meta.env.VITE_APP_WS_URL}?token=${token}`;
  const { ws } = useWebSocketConnection(wss_uri);

  const sendMessage = () => {
    if (!ws.current || !chat.data || !user.data) return;
    if (ws.current.readyState !== 1) return;
    const current = ws.current;
    const message = { type: 'message', chat_id: chat.data.chatId, 
      message: { message: newMessage, user_id: user.data.email, chat_id: chat.data.chatId } };
    current.send(JSON.stringify(message));
    setMessage('');
  };

  const setNewMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

  return { sendMessage, newMessage, setNewMessage };
};