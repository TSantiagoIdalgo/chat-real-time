import { useWebSocketConnection } from '#utils/hooks/useWebsocketConnection';
import { AppState } from '#utils/state/state';
import { receiveMessages } from '../service/send-message';
import { FetchData } from '#utils/services/fetch-data';
import * as libs from '../libs/libs';
import { IChatConnection } from '#utils/types/types';
import { setChats } from '#utils/state/features/chatSlice';

export const useGetChats = () => {
  const user = libs.useSelector((state: AppState) => state.user);
  const dispatch = libs.useDispatch();
  const wss_uri = import.meta.env.VITE_APP_WS_URL;
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const { ws } = useWebSocketConnection(`${wss_uri}?token=${token}`);
  
  const chats = libs.useSelector((state: AppState) => state.chats);
  
  libs.useEffect(() => {
    if (!ws || !user.data) return;
    const fetchChats = async () => {
      const fetch = await FetchData<IChatConnection[]>({
        method: 'GET',
        uri: 'user/chats/active',
        headers: {
          'Authorization': window.sessionStorage.getItem('XSRF-TOKEN') as string
        }
      });
      const response = fetch.map(chat => (
        { targetId: chat.users[0].email,
          lastMessage: chat.messages[0] ? chat.messages[0].message : '',
          targetName: chat.users[0].name,
          chatId: chat.chat_id }
      ));
      dispatch(setChats(response));
    };fetchChats();
    receiveMessages(ws, dispatch);
  },[ws, user.data, dispatch]);

  return { chats };
};