import { IUser } from '#utils/types/types';
import Style from './users-list.module.css';
import React from 'react';

import { FetchData } from '#utils/services/fetch-data';
import { useEffect, useState } from 'react';
import { Chat } from '#utils/types/types';

interface UserListPropos {
    users: IUser[];
    setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
    userId: string
}

export default function UsersList ({ setUserId, users, userId }: UserListPropos) {
  const [chats, setChats] = useState<string[]>([]);
  useEffect(() => {
    const getChats = async () => {
      const response = await FetchData<Chat[]>({
        method: 'GET',
        uri: 'user/chat/messages',
        headers: {
          'Authorization': window.sessionStorage.getItem('XSRF-TOKEN') as string
        }
      });
      response.forEach(chat => {
        const result = chat.usersInChat.filter(u => u !== userId);
        setChats(result);
      });

    };
    getChats();
  }, [userId]);

  return (
    <div className={Style.users}>
      {users.map(user => (
        <span onClick={() => setUserId(user.email)} key={user.email}>{user.name}</span>
      ))}
      <div className={Style.middle}></div>
      {chats.map(user => (
        <span onClick={() => setUserId(user)} key={user}>{user}</span>
      ))}
    </div>
  );
}