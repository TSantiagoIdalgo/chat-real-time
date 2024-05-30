import { IUser } from '#utils/types/types';
import { useEffect, useState } from 'react';

import { FetchData } from '#utils/services/fetch-data';

export const useFetchUser = () => {
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    const getUser = async () => {
      const response = await FetchData<IUser>({
        method: 'GET',
        uri: 'user/user',
        headers: {
          'Authorization': window.sessionStorage.getItem('XSRF-TOKEN') as string
        }
      });
      setUser(response);
    };
    getUser();
  }, []);

  return { user };
};