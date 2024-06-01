import { fetchUserData } from '../service/fetch-user-data';
import { AppState } from '#utils/state/state';
import { setUser } from '#utils/state/features/userSlice';
import * as libs from '../libs/libs';

export const useGetUser = () => {
  const dispatch = libs.useDispatch();
  const state = libs.useSelector((state: AppState) => state.user);
  libs.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData();
      dispatch(setUser(data));
    };
    fetchData();
  }, [dispatch]);

  return { user: state.data };
};