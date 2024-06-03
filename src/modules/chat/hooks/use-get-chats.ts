import { useWebSocketConnection } from '#utils/hooks/useWebsocketConnection';
import { AppState } from '#utils/state/state';
import { sendRequestLastMessages } from '#utils/utils/websocket-messages';
import { IGetChats } from '#utils/types/types';
import { setChats } from '#utils/state/features/chatSlice';
import * as libs from '../libs/libs';

export const useGetChats = () => {
  const user = libs.useSelector((state: AppState) => state.user);
  const dispatch = libs.useDispatch();
  const wss_uri = import.meta.env.VITE_APP_WS_URL;
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const { ws } = useWebSocketConnection(`${wss_uri}?token=${token}`);
  
  const chats = libs.useSelector((state: AppState) => state.chats);
  
  libs.useEffect(() => {
    if (!ws || !user.data) return;
  
    ws.send(JSON.stringify(sendRequestLastMessages(user.data.email)));
  
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data) as IGetChats;
      if (data.type === 'get_last_messages') {
        const response = data.chats.map(chat => (
          { targetId: chat.users[0].email,
            lastMessage: chat.messages[0].message,
            targetName: chat.users[0].name,
            chatId: chat.chat_id }
        ));
        dispatch(setChats(response));
      }
    };
  },[ws, user.data, dispatch]);

  return { chats };
};