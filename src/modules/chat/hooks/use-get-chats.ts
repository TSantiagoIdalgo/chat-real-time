import * as libs from '../libs/libs';
import { AppState } from '#utils/state/state';
import { useWebSocketConnection } from '#utils/hooks/useWebsocketConnection';
import { Initial_chats, TypesResponse } from '#utils/types/types';
import { setChats, updateChat } from '#utils/state/features/chatSlice';

export const useGetChats = () => {
  const dispatch = libs.useDispatch();
  const user = libs.useSelector((state: AppState) => state.user);
  const chats = libs.useSelector((state: AppState) => state.chats);
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const wss_uri = `${import.meta.env.VITE_APP_WS_URL}?token=${token}`;
  const { ws, connecting } = useWebSocketConnection(wss_uri);
  
  libs.useEffect(() => {
    if (!ws.current || !user.data) return;
    const current = ws.current;
    const handleMessage = (e: MessageEvent<any>) => {
      const data = JSON.parse(e.data) as Initial_chats;
      if (data.type === TypesResponse.INITIAL_CHATS) {
        const response = data.chat.map((chat) => ({
          targetId: chat.usersInChat.find((targetId) => targetId !== user.data.email),
          lastMessage: chat.messages[0] ? chat.messages[0].message : '',
          targetName: chat.users.find((targetUser) => targetUser.email !== user.data.email)?.name,
          chatId: chat.chat_id
        }));
        dispatch(setChats(response));
      } else if (data.type === TypesResponse.UPDATED_CHATS) {
        dispatch(updateChat(data.chat));
      }
    };
  
    current.addEventListener('message', handleMessage);
    return () => {
      if (current) {
        current.removeEventListener('message', handleMessage);
      }
    };
  }, [ws, connecting, user.data, dispatch]);
  
  libs.useEffect(() => {
    if (!ws.current) return;
    if (ws.current.readyState !== 1) return;
    const current = ws.current;
    current.send(JSON.stringify({ type: 'get_chats' }));
  }, [connecting, ws, user.data]);

  return { chats };
};