import Message from '../message/message';
import { useGetMessages } from '../../hooks/use-get-messages';

export default function Messages () {
  const { messages } = useGetMessages();
  if (!messages.messages) return <p></p>;

  return (
    <section className='messages'>
      <Message messages={messages.messages}/>
    </section>
  );
}