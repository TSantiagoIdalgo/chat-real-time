import Style from './chat.module.css';
import UsersList from '../users/users-list';
import ChatMessages from '../chat-messages/chat-messages';
import { useState } from 'react';
import { useFetchUser } from '#utils/hooks/useGetUser';
import { useGetUsers } from '#utils/hooks/useGetUsers';

export default function Chat() {
  const [userId, setUserId] = useState<string>();
  const { user } = useFetchUser();
  const { users } = useGetUsers(user?.email);
  
  if (!user || users.length === 0) return <p>Cargando usuario</p>;

  return (
    <main className={Style.main}>
      <UsersList setUserId={setUserId} users={users} userId={user.email}/>
      {userId && <ChatMessages TargetUserId={userId} user={user}/>}
    </main>
  );
}