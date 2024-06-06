import { FetchData } from '#utils/services/fetch-data';
import { IUser } from '#utils/types/types';
import * as libs from '../libs/libs';

export const useGetUsers = () => {
  const [search, setSearch] = libs.useState('');
  const [users, setUsers] = libs.useState<IUser[]>([]);

  libs.useEffect(() => {
    if (search.length === 0) return;
    const fetchUsers = async () => {
      const users = await FetchData<IUser[]>({
        method: 'GET',
        uri: `user/name/${search}`,
        headers: {
          'Authorization': window.sessionStorage.getItem('XSRF-TOKEN') as string
        }
      });
      setUsers(users);
    };
    fetchUsers();
  }, [search.length]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  return { users, handleSearch, search, setSearch };
};