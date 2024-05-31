import { IUser } from '#utils/types/types';
import { useWebScoket } from '#utils/hooks/useWebScoket';
import { useEffect } from 'react';
import Message from '../message/message';
import Style from './chat-messages.module.css';
import { useSendMessage } from '#utils/hooks/useSendMessage';
import { useLayoutEffect } from 'react';


interface IUserId {
    TargetUserId: string
    user: IUser
}

export default function ChatMessages ({ TargetUserId, user }: IUserId) {
  const { chat, messages, ws, isWriting } = useWebScoket(user.email, TargetUserId);
  const { sendMessage, newMessage, handleNewMessage } = useSendMessage(user.email, TargetUserId, ws, chat?.chat_id);
  useEffect(() => {
    if (!ws || ws.readyState !== ws.OPEN || newMessage.length > 4) return;
    const writeMessage = {
      chat_id: chat?.chat_id,
      usersInChat: [user.email, TargetUserId],
      message: {
        type: newMessage.length > 3 ? 'write_message' : 'stop_write_message',
        user_id: user.email,
        chat_id: chat?.chat_id
      }
    };
    ws.send(JSON.stringify(writeMessage));
    
  }, [newMessage.length, chat?.chat_id, ws, user.email, TargetUserId]);

  useLayoutEffect(() => {
    const messagesBox = document.getElementById('messages');
    if (!messagesBox) return;
    messagesBox.scrollTo(0, messagesBox.scrollHeight);
  }, [messages.length]);
  console.log(isWriting);
  
  return (
    <div className={Style.chat}>
      <div className={Style.title}>
        <h2>{TargetUserId}</h2>
        <span>{isWriting && 'typing...'}</span>
      </div>
      <ul className={Style.messages} id='messages'>
        {Array.isArray(messages) && messages.map((message) => (
          <Message message={message} userId={user.email} key={message.id}/>
        ))}
      </ul>
      <div className={Style.content_input}>
        <input className={Style.input} type="text" onChange={handleNewMessage} onKeyDown={(e) => e.key === 'Enter' && sendMessage()}  value={newMessage}/>
        <button className={Style.send_button} type='button' onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}