import { FetchData } from '#utils/services/fetch-data';
import { IUser } from '#utils/types/types';

export const fetchUserData = async () => {
  const token = window.sessionStorage.getItem('XSRF-TOKEN');
  const user = await FetchData<IUser>({
    uri: 'user/user',
    method: 'GET',
    headers: {
      'Authorization': token as string
    }
  });
  return user;
};