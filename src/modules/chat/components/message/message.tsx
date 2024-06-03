import { IMessages } from '#utils/types/types';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import Style from './message.module.css';
import { AppState } from '#utils/state/state';

interface MessageProps {
    messages: IMessages[];
}

const Message = ({ messages }: MessageProps) => {
  const userId = useSelector((state: AppState) => state.user.data.email);
  useLayoutEffect(() => {
    const messagesContent = document.getElementById('messages-content');
    messagesContent?.scrollTo(0, messagesContent.scrollHeight);
  }, [messages.length]);
  const getTime = (date: string) => {
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes()}`;
  };
  return (
    <div id='messages-content' className={Style.message_content}>
      {messages.map((message) => (
        <figure key={message.id} className={message.user_id === userId ? Style.message_right : Style.message_left}>
          <span className={Style.avatar_icon}/>
          <div className={Style.message}>
            <p>{message.message}</p>
            <span>{getTime(message.createdAt)}</span>
          </div>
        </figure>
      ))}
    </div>
  );
};

export default Message;