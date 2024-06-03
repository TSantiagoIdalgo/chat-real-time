import Message from '../message/message';
import { useGetMessages } from '#utils/hooks/useGetMessages';

export default function Messages () {
  const { messages } = useGetMessages();
  return (
    <section className='messages'>
      <Message messages={messages}/>
    </section>
  );
}