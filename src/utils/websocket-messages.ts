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

export const sendRequestLastMessages = (userId: string) => {
  return {
    message: {
      type: 'get_last_messages',
      user_id: userId
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