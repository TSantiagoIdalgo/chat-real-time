import Style from './chat-user.module.css';
import * as libs from '../../libs/libs';
import { AppState } from '#utils/state/state';


export default function ChatUser () {
  const targetUser = libs.useSelector((state: AppState) => state.targetUser);
  const write = libs.useSelector((state: AppState) => state.write);

  if (!targetUser.data) return <p></p>;
  return (
    <header className="chat_user">
      <h2 className={Style.target_user_name }>{targetUser.data.targetName}</h2>
      <span className={Style.Typing}>{ write.data.chatIds.includes(targetUser.data.chatId) && 'Typing...'}</span> 
    </header>
  );
}