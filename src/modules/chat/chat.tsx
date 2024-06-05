import { AppState } from '#utils/state/state';
import { useSelector } from 'react-redux';
import ChatUser from './components/chat-user/chat-user';
import Chats from './components/chats/chats';
import InputMessage from './components/input-message/input-message';
import Messages from './components/messages/messages';
import User from './components/user/user';
import './chat.css';
import { useGetWrite } from './hooks/use-get-writeStatus';


export default function Chat () {
  const state = useSelector((state: AppState) => state.targetUser);
  const { typing, chatId } = useGetWrite();
  return (
    <div className='container'>
      <Chats typing={typing} chatIds={chatId}/>
      <User/>
      {state.data ? 
        <>
          <ChatUser/>
          <Messages/>
          <InputMessage/>
        </>
        : null}
    </div>
  );
}