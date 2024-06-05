import { FetchData } from '#utils/services/fetch-data';
import { AppState } from '#utils/state/state';
import { setUser } from '#utils/state/features/userSlice';
import { IUser } from '#utils/types/types';
import * as libs from '../libs/libs';

export const useGetUser = () => {
  const dispatch = libs.useDispatch();
  const state = libs.useSelector((state: AppState) => state.user);
  libs.useEffect(() => {
    const fetchData = async () => {
      const data = await FetchData<IUser>({
        uri: 'user/user',
        method: 'GET',
        headers: {
          'Authorization': window.sessionStorage.getItem('XSRF-TOKEN') as string
        }
      });
      dispatch(setUser(data));
    };
    fetchData();
  }, [dispatch]);

  return { user: state.data };
};