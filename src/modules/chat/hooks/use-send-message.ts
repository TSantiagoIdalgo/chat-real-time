import { useWebSocketConnection } from '#utils/hooks/useWebsocketConnection';
import { setNewMessage } from '#utils/state/features/messagesSlice';
import { sendNewMessage } from '#utils/utils/websocket-messages';
import * as libs from '../libs/libs';
import { AppState } from '#utils/state/state';
import { IChatMessage, INewMessage } from '#utils/types/types';
import { setMessages } from '#utils/state/features/messagesSlice';

export const useSendMessage = () => {
  const [message, setMessage] = libs.useState<string>('');
  const dispatch = libs.useDispatch();
  const targetUser = libs.useSelector((state: AppState) => state.targetUser);
  const user = libs.useSelector((state: AppState) => state.user);
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const wsURI = `${import.meta.env.VITE_APP_WS_URL}?token=${token}`;
  const { ws } = useWebSocketConnection(wsURI);
  
  libs.useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as INewMessage;
      if (data.type === 'new_message') {
        dispatch(setNewMessage(data));
      } else if (data.type === 'initial_message') {
        const data = JSON.parse(event.data) as IChatMessage;
        dispatch(setMessages(data.messages));
      }
    };

  }, [ws, targetUser.data.targetId, dispatch, targetUser.data]);

  const sendHandleMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  const sendMessage = () => {
    if (message.length === 0 || !ws) return;
    const newMessage = sendNewMessage(targetUser.data.chatId, user.data.email, targetUser.data.targetId, message);
    ws.send(JSON.stringify(newMessage));
    setMessage('');
  };
  return { message, sendHandleMessage, sendMessage };

};