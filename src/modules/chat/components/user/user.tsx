import Style from './user.module.css';
import { useGetUser } from '../../hooks/useGetUser';
import { useGetUsers } from '../../hooks/use-get-users';

import { Chat, IUser } from '#utils/types/types'; 
import { FetchData } from '#utils/services/fetch-data';
import { useWebSocketConnection } from '#utils/hooks/useWebsocketConnection';
import { useDispatch } from 'react-redux';
import { setTargetUser } from '#utils/state/features/targetChatSlice';

export default function User() {
  const dispatch = useDispatch();
  const token = window.sessionStorage.getItem('XSRF-TOKEN');  
  const wss_uri = `${import.meta.env.VITE_APP_WS_URL}?token=${token}`;
  const { ws } = useWebSocketConnection(wss_uri);
  const { handleSearch, search, users, setSearch } = useGetUsers();
  const { user } = useGetUser();
  
  const createChat = async (setUser: IUser) => {
    if (!ws.current) return;
    if (ws.current.readyState !== 1) return;
    const current = ws.current;
    const chat = await FetchData<Chat>({
      method: 'POST',
      uri: 'chat',
      body: { email: setUser.email },
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': token as string
      },
    });
    const response = {
      targetId: chat.usersInChat.find((targetId) => targetId !== user.email),
      lastMessage: chat.messages[0] ? chat.messages[0].message : '',
      targetName: chat.users.find((targetUser) => targetUser.email !== user.email)?.name,
      chatId: chat.chat_id
    };
    current.send(JSON.stringify({ type: 'get_chats' }));
    dispatch(setTargetUser(response));
    setSearch('');
  };

  return (
    <section className='user'>
      { user && <h2 className={Style.user_name}>{user.name}</h2>}
      <input type="search" className={Style.input_name} placeholder='Search users...' value={search} onChange={handleSearch}/>
      {search.length >= 1 && users.length > 0 &&
        <div className={Style.user_list}>
          {users.map((user) => (
            <div key={user.email} className={Style.users} onClick={() => createChat(user)}>
              <span className={Style.user_chat_avatar}/>
              <h2>{user.name}</h2>
            </div>
          ))}
        </div>}
    </section>
  );
}