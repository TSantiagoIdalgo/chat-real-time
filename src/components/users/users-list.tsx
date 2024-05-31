import { useGetChats } from '#utils/hooks/useGetChats';
import { IUser } from '#utils/types/types';
import Style from './users-list.module.css';
import React from 'react';

interface UserListPropos {
  users: IUser[];
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
  userId: string
}

export default function UsersList({ setUserId, users, userId }: UserListPropos) {
  const { chats } = useGetChats(userId);
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