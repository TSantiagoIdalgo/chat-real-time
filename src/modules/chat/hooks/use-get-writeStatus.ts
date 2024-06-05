import { useWebSocketConnection } from '#utils/hooks/useWebsocketConnection';
import { AppState } from '#utils/state/state';
import * as libs from '../libs/libs';

export const useGetWrite = () => {
  const chat = libs.useSelector((state: AppState) => state.targetUser);
  const write = libs.useSelector((state: AppState) => state.write);
  const user = libs.useSelector((state: AppState) => state.user);
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const wss_uri = `${import.meta.env.VITE_APP_WS_URL}?token=${token}`;
  const { ws, connecting } = useWebSocketConnection(wss_uri);
  libs.useEffect(() => {
    if (!ws.current || !chat.data || !user.data) return;
    if (ws.current.readyState !== WebSocket.OPEN) return;

    const message = {
      type: write.data.text.length >= 5 ? 'write_message' : 'stop_write_message',
      usersInChat: [user.data.email, chat.data.targetId],
      chat_id: chat.data.chatId
    };
    ws.current.send(JSON.stringify(message));

  }, [connecting, ws, write.data.text.length, chat.data, user.data]);
  return { typing: write.data.loading, chatId: write.data.chatIds };
};