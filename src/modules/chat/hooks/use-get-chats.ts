import * as libs from '../libs/libs';
import { AppState } from '#utils/state/state';
import { useWebSocketConnection } from '#utils/hooks/useWebsocketConnection';

export const useGetChats = () => {
  const user = libs.useSelector((state: AppState) => state.user);
  const chats = libs.useSelector((state: AppState) => state.chats);
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const wss_uri = `${import.meta.env.VITE_APP_WS_URL}?token=${token}`;
  const { ws, connecting } = useWebSocketConnection(wss_uri);
  libs.useEffect(() => {
    if (!ws.current) return;
    if (ws.current.readyState !== 1) return;
    const current = ws.current;
    current.send(JSON.stringify({ type: 'get_chats' }));
  }, [connecting, ws, user.data]);

  return { chats };
};