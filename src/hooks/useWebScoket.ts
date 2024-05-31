import { useState, useEffect } from 'react';
import { IChatConnection, IMessages } from '#utils/types/types';

export  const useWebScoket = (userId: string, targetId: string) => {
  const [ws, setWs] = useState<WebSocket>();
  const [chat, setChat] = useState<IChatConnection>();
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [isWriting, setIsWriting] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_APP_WS_URL}?token=${window.sessionStorage.getItem('XSRF-TOKEN')}`);
    setWs(ws);
    const connectMessage = {
      usersInChat: [userId, targetId],
      message: {
        type: 'connect',
        user_id: userId
      }
    };
    
    ws.onopen = () => {
      ws.send(JSON.stringify(connectMessage));
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as IChatConnection;
      console.log(data);
      if (data.type === 'initial_message') {
        setChat(data);
        setMessages(data.messages);
      } else if (data.type === 'new_message') {
        const data = JSON.parse(event.data) as IMessages;
        setMessages((prev) => [...prev, data]);
      } else if (data.type === 'write_message') {
        setIsWriting(true);
      } else if (data.type === 'stop_write_message') {
        setIsWriting(false);
      }
    };
    
    ws.onclose = () => {
      console.log('Session closed');
    };
    
  }, [targetId, userId]);

  return { ws, chat, messages, isWriting };
};