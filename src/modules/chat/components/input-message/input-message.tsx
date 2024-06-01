import Style from './input-message.module.css';

export default function InputMessage () {
  return (
    <figure className='input'>
      <input type="text" className={Style.input_message} />
    </figure>
  );
}