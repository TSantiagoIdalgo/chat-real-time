import { useGetChats } from '../../hooks/use-get-chats';
import Style from './chats.module.css';
import { useDispatch } from 'react-redux';
import { setTargetUser } from '#utils/state/features/targetChatSlice';

export default function Chats () {
  const { chats } = useGetChats();
  console.log(chats);
  const dispatch = useDispatch();
  return (
    <aside className="chats">
      {chats.data.map(chat => (
        <div key={chat.targetId} className={Style.user_chat} onClick={() => dispatch(setTargetUser(chat))}>
          <span className={Style.user_chat_avatar}></span>
          <div className={Style.user_chat_data}>
            <h2>{chat.targetName}</h2>
            <h5>{chat.lastMessage}</h5>
          </div>
        </div>
      ))}
    </aside>
  );
}