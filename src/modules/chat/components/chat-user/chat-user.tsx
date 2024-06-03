import { useSelector } from 'react-redux';
import { AppState } from '#utils/state/state';
import Style from './chat-user.module.css';

export default function ChatUser () {
  const targetUser = useSelector((state: AppState) => state.targetUser);
  return (
    <header className="chat_user">
      <h2 className={Style.target_user_name}>{targetUser.data.targetName}</h2>
    </header>
  );
}