import Style from './chats.module.css';
import { useGetChats } from '../../hooks/use-get-chats';
import { setTargetUser } from '#utils/state/features/targetChatSlice';
import * as libs from '../../libs/libs';

export default function Chats () {
  const { chats } = useGetChats();
  const dispatch = libs.useDispatch();
 
  if (!chats.data.length) return <p></p>;
  return (
    <aside className="chats">
      {chats.data.map((chat) => (
        <div key={chat.chatId} className={Style.user_chat} onClick={() => dispatch(setTargetUser(chat))}>
          <span className={Style.user_chat_avatar}/>
          <div className={Style.user_chat_data}>
            <h2>{chat.targetName}</h2>
            <h5>{chat.lastMessage}</h5>
          </div>
        </div>
      ))}
    </aside>
  );
}