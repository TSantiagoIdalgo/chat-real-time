import { useState, useEffect } from 'react';
import { IChatConnection, IMessages } from '#utils/types/types';

export  const useWebScoket = (userId: string, targetId: string) => {
  const [ws, setWs] = useState<WebSocket>();
  const [chat, setChat] = useState<IChatConnection>();
  const [messages, setMessages] = useState<IMessages[]>([]);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_APP_WS_URL);
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
      if (data.type === 'initial_message') {
        setChat(data);
        setMessages(data.messages);
      } else if (data.type === 'new_message') {
        const data = JSON.parse(event.data) as IMessages;
        setMessages((prev) => [...prev, data]);
      }
    };
    
    ws.onclose = () => {
      console.log('Session closed');
    };
    
    return () => {
      ws.close();
    };
    
  }, [targetId, userId]);

  return { ws, chat, messages };
};