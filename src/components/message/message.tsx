import Style from './message.module.css';
import { IMessages } from '#utils/types/types';

interface MessageProps {
    message: IMessages;
    userId: string;
}

export default function Message ({ message, userId }: MessageProps) {
  return (
    <div className={userId === message.user_id ? Style.message_user : Style.message}>
      <h2>{message.message}</h2>
      <span>{message.status === 'sent' && 'sent'}</span>
      <span>{message.status === 'read' && 'read'}</span>
    </div>
  );
}