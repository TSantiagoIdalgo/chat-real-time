import { IUser } from '#utils/types/types';
import { useEffect, useState } from 'react';
import { FetchData } from '#utils/services/fetch-data';

export const useGetUsers = (userId: string | undefined) => {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await FetchData<IUser[]>({
        method: 'GET',
        uri: 'user',
      });
      const users = response.filter(user => {
        return user.email !== userId;
      });
      setUsers(users);
    };
    getUsers();
  }, [userId]);

  return { users };
};