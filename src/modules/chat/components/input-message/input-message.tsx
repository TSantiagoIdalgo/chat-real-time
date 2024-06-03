import Style from './input-message.module.css';
import sendIcon from '../../../../assets/send-icon.webp';

export default function InputMessage () {
  return (
    <figure className='input'>
      <textarea className={Style.input_message} placeholder='Type your message...'/>
      <div className={Style.send_button}>
        <img src={sendIcon} alt="send" />
      </div>
    </figure>
  );
}