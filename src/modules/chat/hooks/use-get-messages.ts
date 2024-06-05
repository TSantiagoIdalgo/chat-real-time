import * as libs from '../libs/libs';
import { useWebSocketConnection } from '#utils/hooks/useWebsocketConnection';
import { AppState } from '#utils/state/state';

export const useGetMessages = () => {
  const messages = libs.useSelector((state: AppState) => state.messages);
  const chat = libs.useSelector((state: AppState) => state.targetUser);
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const wss_uri = `${import.meta.env.VITE_APP_WS_URL}?token=${token}`;
  const { ws, connecting } = useWebSocketConnection(wss_uri);
  
  libs.useEffect(() => {
    if (!ws.current || !chat.data.chatId) return;
    if (ws.current.readyState !== 1) return;
    const current = ws.current;
    current.send(JSON.stringify({ type: 'connect', chat_id: chat.data.chatId }));
  }, [connecting, ws, chat.data]);

  return { messages };
};