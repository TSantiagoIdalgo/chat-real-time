import { useGetChats } from '../../hooks/use-get-chats';
import Style from './chats.module.css';

export default function Chats () {
  const { chats } = useGetChats();
  return (
    <aside className="chats">
      {chats.data.map(chat => (
        <div key={chat.targetId} className={Style.user_chat}>
          <h2>{chat.targetName}</h2>
          <h5>{chat.lastMessage}</h5>
        </div>
      ))}
    </aside>
  );
}