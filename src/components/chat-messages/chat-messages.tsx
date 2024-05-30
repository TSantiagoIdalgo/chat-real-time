import { IUser } from '#utils/types/types';
import { useWebScoket } from '#utils/hooks/useWebScoket';
import Style from './chat-messages.module.css';
import { useSendMessage } from '#utils/hooks/useSendMessage';

interface IUserId {
    TargetUserId: string
    user: IUser
}

export default function ChatMessages ({ TargetUserId, user }: IUserId) {
  const { chat, messages, ws } = useWebScoket(user.email, TargetUserId);
  const { handleNewMessage, sendMessage, newMessage } = useSendMessage(user.email, TargetUserId, ws, chat?.chat_id,);

  return (
    <div className={Style.chat}>
      <ul>
        {Array.isArray(messages) && messages.map((message) => (
          <div key={message.id}>
            <h2>{message.user_id}: {message.message}</h2>
          </div>
        ))}
      </ul>
      <input type="text" onChange={handleNewMessage} value={newMessage}/>
      <button type='button' onClick={sendMessage}>Send</button>
    </div>
  );
}