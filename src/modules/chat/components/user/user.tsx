import Style from './user.module.css';
import { useGetUser } from '../../hooks/useGetUser';

export default function User() {
  const { user } = useGetUser();
  return (
    <section className='user'>
      { user && <h2 className={Style.user_name}>{user.name}</h2>}
      <input type="search" className={Style.input_name} placeholder='Search users...'/>
    </section>
  );
}