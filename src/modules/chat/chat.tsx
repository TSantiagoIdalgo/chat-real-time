import ChatUser from './components/chat-user/chat-user';
import Chats from './components/chats/chats';
import InputMessage from './components/input-message/input-message';
import Messages from './components/messages/messages';
import User from './components/user/user';
import './chat.css';

export default function Chat () {
  return (
    <div className='container'>
      <ChatUser/>
      <Chats/>
      <Messages/>
      <InputMessage/>
      <User/>
    </div>
  );
}