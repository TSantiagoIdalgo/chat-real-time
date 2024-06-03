import { AppState } from '#utils/state/state';
import * as libs from '../libs/libs';

export const useGetMessages = () => {
  const { messages } = libs.useSelector((state: AppState) => state.messages);

  return { messages };
};