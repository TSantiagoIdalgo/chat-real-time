import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginType } from '../validate/login-schema';
import { FetchData } from '#utils/services/fetch-data';

export const useLogin = () => {
  const { register, handleSubmit, formState: { errors }, setError} = useForm<LoginType>({
    resolver: zodResolver(LoginSchema)
  });
    
  const onSubmit = async (data: LoginType) => {
    try {
      const response = await FetchData<{ token: string }>({
        method: 'POST',
        uri: 'user/login',
        body: data,
        headers: {
          'Content-Type': 'Application/json'
        }
      });
      window.sessionStorage.setItem('XSRF-TOKEN', response.token);
      window.location.href = '/chat';
    } catch (error) {
      setError('password', {
        message: 'Failed to fetch'
      });
    }
  };

  return { register, handleSubmit, errors, onSubmit };
};