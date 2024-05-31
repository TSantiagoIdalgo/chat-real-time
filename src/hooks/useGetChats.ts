import { useState, useEffect } from 'react';
import { FetchData } from '#utils/services/fetch-data';
import { Chat } from '#utils/types/types';

export const useGetChats = (userId: string) => {
  const [chats, setChats] = useState<(string | undefined)[]>([]);
  useEffect(() => {
    const getChats = async () => {
      const response = await FetchData<Chat[]>({
        method: 'GET',
        uri: 'user/chat/messages',
        headers: {
          'Authorization': window.sessionStorage.getItem('XSRF-TOKEN') as string
        }
      });

      const users = response.map(chat => {
        return chat.usersInChat.find(user => user !== userId);
      });
      setChats(users);
    };
    getChats();
  }, [userId]);

  return { chats };
};