import { useState } from 'react';

export const useSendMessage = (userId: string, targetId: string, ws?: WebSocket, chatId?: string) => {
  const [newMessage, setNewMessage] = useState<string>('');

  const sendMessage = () => {
    if (!ws || !chatId || newMessage.length === 0) return;
    const sendNewMessage = {
      chat_id: chatId,
      usersInChat: [userId, targetId],
      message: {
        chat_id: chatId,
        type: 'message',
        user_id: userId,
        message: newMessage
      }
    };
    ws.send(JSON.stringify(sendNewMessage));
    setNewMessage('');
  };

  const handleNewMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  return { sendMessage, newMessage, handleNewMessage };
};