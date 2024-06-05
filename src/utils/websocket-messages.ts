export const sendNewMessage = (chatId: string, userId: string, targetId: string, newMessage: string) => {
  return {
    chat_id: chatId,
    usersInChat: [userId, targetId],
    message: {
      chat_id: chatId,
      type: 'message',
      user_id: userId,
      message: newMessage
    }
  };
};

export const sendRequestLastMessages = (chatId: string) => {
  return {
    chat_id: chatId,
    message: {
      type: 'get_last_messages',
    }
  };
};

export const sendConnectMessage = (userId: string, targetId: string) => {
  return {
    usersInChat: [userId, targetId],
    message: {
      type: 'connect',
      user_id: userId
    }
  };
};

export const sendWriteMessage = (chatId: string, users: string[], userId: string, type: 'write_message' | 'stop_write_message') => {
  return {
    chat_id: chatId,
    usersInChat: users,
    message: {
      type: type,
      user_id: userId
    }
  };
};