import * as libs from '../libs/libs';
import { useWebSocketConnection } from '#utils/hooks/useWebsocketConnection';
import { setMessages, setNewMessage } from '#utils/state/features/messagesSlice';
import { AppState } from '#utils/state/state';
import { Initial_message, New_message, TypesResponse } from '#utils/types/types';

export const useGetMessages = () => {
  const messages = libs.useSelector((state: AppState) => state.messages);

  const dispatch = libs.useDispatch();
  const chat = libs.useSelector((state: AppState) => state.targetUser);
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const wss_uri = `${import.meta.env.VITE_APP_WS_URL}?token=${token}`;
  const { ws, connecting } = useWebSocketConnection(wss_uri);
  
  libs.useEffect(() => {
    if (!ws.current) return;
    const current = ws.current;
  
    const handleMessage = (e: MessageEvent<any>) => {
      const data = JSON.parse(e.data) as Initial_message;
      if (data.type === TypesResponse.INITIAL_MESSAGE) {
        dispatch(setMessages(data.chat.messages));
      } else if (data.type === TypesResponse.NEW_MESSAGE) {
        const data = JSON.parse(e.data) as New_message;
        dispatch(setNewMessage(data.message));
      }
    };
    
    current.addEventListener('message', handleMessage);
    return () => {
      if (current) {
        current.removeEventListener('message', handleMessage);
      }
    };
  }, [ws, connecting, dispatch]);
  
  libs.useEffect(() => {
    if (!ws.current || !chat.data.chatId) return;
    if (ws.current.readyState !== 1) return;
    const current = ws.current;
    current.send(JSON.stringify({ type: 'connect', chat_id: chat.data.chatId }));
  }, [connecting, ws, chat.data]);

  return { messages };
};