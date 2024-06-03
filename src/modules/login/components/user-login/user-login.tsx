import Style from './user-login.module.css';
import Input from '#src/modules/core/Input/Input';
import Button from '#src/modules/core/button/button';
import { useLogin } from '../../hooks/useLogin';

export default function UserLogin () {
  const { register, handleSubmit, errors, onSubmit } = useLogin();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={Style.login}>
      <Input info={register('email')} name='email' type='email' error={errors.email?.message}/>
      <Input info={register('password')} name='password' type='password' error={errors.password?.message}/>
      <div className={Style.login_button}>
        <Button type='submit' text='Register' onClick={() => console.log('Register')} /> 
        <Button type='submit' text='Login' onClick={() => console.log('Login')} /> 
      </div>
    </form>
  );
}