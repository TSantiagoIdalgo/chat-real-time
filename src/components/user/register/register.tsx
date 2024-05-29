import Template from '#src/components/template/template';
import Style from './register.module.css';
import Input from '#src/components/input/input';
import Button from '#src/components/button/button';
import { usePostUser } from '#utils/hook/use-get-token/use-post-user';

export default function Register () {
  const { register, handleSubmit, onSubmit, errors } = usePostUser();
  return (
    <Template>
      <form onSubmit={handleSubmit(onSubmit)} className={Style.register}>
        <Input name='Name' register={register('name')} type='name' error={errors.password?.message}/>
        <Input name='Email adress' register={register('email')} type='email' error={errors.email?.message}/>
        <div className={Style.password}>
          <Input name='Password' register={register('password')} type='password' error={errors.password?.message}/>
          <Input name='Confirm password' register={register('confirmPassword')} type='password' error={errors.confirmPassword?.message}/>
        </div>
        <div className={Style.buttons}>
          <Button text='Go back' type='button' onClick={() => window.location.href = '/login'}/>
          <Button text='Register' type='submit' onClick={() => {}}/>
        </div>
      </form>
    </Template>
  );
}