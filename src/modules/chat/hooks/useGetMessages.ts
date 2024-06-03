import { useWebSocketConnection } from '../../../hooks/useWebsocketConnection';
import { sendConnectMessage } from '#utils/utils/websocket-messages';
import { AppState } from '#utils/state/state';
import { IChatConnection } from '#utils/types/types';
import { setMessages } from '#utils/state/features/messagesSlice';
import * as libs from '../libs/libs';

export const useGetMessages = () => {
  const { messages } = libs.useSelector((state: AppState) => state.messages);
  const dispatch = libs.useDispatch();
  const userId = libs.useSelector((state: AppState) => state.user);
  const targetId = libs.useSelector((state: AppState) => state.targetUser);
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const webSocketUrl = `${import.meta.env.VITE_APP_WS_URL}?token=${token}`;
  const { ws } = useWebSocketConnection(webSocketUrl);
  
  libs.useEffect(() => {
    if (!ws) return;
    ws.send(JSON.stringify(sendConnectMessage(userId.data.email, targetId.data.targetId)));
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as IChatConnection;
      if (data.type === 'initial_message') {
        dispatch(setMessages(data.messages));
      }
    };

  }, [ws, targetId.data.targetId, dispatch, targetId.data]);

  return { messages };
};