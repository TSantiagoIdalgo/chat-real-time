import { useWebSocketConnection } from '#utils/hooks/useWebsocketConnection';
import { sendNewMessage, sendRequestLastMessages } from '#utils/utils/websocket-messages';
import * as libs from '../libs/libs';
import { AppState } from '#utils/state/state';
import { sendConnectMessage } from '#utils/utils/websocket-messages';
import { receiveMessages } from '../service/send-message';

export const useSendMessage = () => {
  const [message, setMessage] = libs.useState<string>('');
  const dispatch = libs.useDispatch();
  const userId = libs.useSelector((state: AppState) => state.user);
  const targetId = libs.useSelector((state: AppState) => state.targetUser);
  const targetUser = libs.useSelector((state: AppState) => state.targetUser);
  const user = libs.useSelector((state: AppState) => state.user);
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const wsURI = `${import.meta.env.VITE_APP_WS_URL}?token=${token}`;
  const { ws } = useWebSocketConnection(wsURI);
  
  libs.useEffect(() => {
    if (!ws) return;

    ws.send(JSON.stringify(sendConnectMessage(userId.data.email, targetId.data.targetId)));
    receiveMessages(ws, dispatch, targetId.data.chatId);
  }, [ws, targetUser.data.targetId, dispatch, targetUser.data]);

  const sendHandleMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };
  const sendMessage = () => {
    if (message.length === 0 || !ws) return;
    const newMessage = sendNewMessage(targetUser.data.chatId, user.data.email, targetUser.data.targetId, message);
    const sendRequest = sendRequestLastMessages(targetUser.data.chatId);
    ws.send(JSON.stringify(newMessage));
    ws.send(JSON.stringify(sendRequest));
    setMessage('');
  };
  return { message, sendHandleMessage, sendMessage };

};