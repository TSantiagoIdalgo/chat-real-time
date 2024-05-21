import Style from './login.module.css';
import Template from '#src/components/chat/template';
import Button from '#src/components/button/button';
import Input from '#src/components/input/input';
import { useFetchToken } from '#utils/hook/use-get-token/useFetchToken';

export default function Login() {
  const { register, handleSubmit, errors, onSubmit } = useFetchToken();

  return (
    <Template>
      <form className={Style.login} onSubmit={handleSubmit(onSubmit)}>
        <Button type='button' text='Login with google' onClick={() => {}}/>
        <div className={Style.middle}/>
        <Input name='Email adress' register={register('email')} type='email' error={errors.email?.message}/>
        <Input name='Password' register={register('password')} type='password' error={errors.password?.message}/>
        <div className={Style.buttons}>
          <Button text='Register' type='button' onClick={() => {}}/>
          <Button text='login' type='submit' onClick={() => {}}/>
        </div>
      </form>
    </Template>
  );
}