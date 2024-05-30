import { IUser } from '#utils/types/types';
import { useEffect, useState } from 'react';
import { FetchData } from '#utils/services/fetch-data';

export const useGetUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await FetchData<IUser[]>({
        method: 'GET',
        uri: 'user',
      });
      setUsers(response);
    };
    getUsers();
  }, []);

  return { users };
};