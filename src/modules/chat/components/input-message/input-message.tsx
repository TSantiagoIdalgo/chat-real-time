import Style from './input-message.module.css';
import sendIcon from '../../../../assets/send-icon.webp';
import { useSendMessage } from '../../hooks/use-send-message';

export default function InputMessage () {
  const { newMessage, sendMessage, setNewMessage } = useSendMessage();

  return (
    <figure className='input'>
      <textarea className={Style.input_message} 
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
        placeholder='Type your message...' 
        onChange={setNewMessage}
        value={newMessage}/>
      <div className={Style.send_button} onClick={sendMessage}>
        <img src={sendIcon} alt="send" />
      </div>
    </figure>
  );
}