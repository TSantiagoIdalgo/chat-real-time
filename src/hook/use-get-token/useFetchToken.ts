import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchToken } from '#utils/services/fetchToken';
import { loginSchema, signInSchema } from '#utils/utils/schemas/login-schema';

export const useFetchToken = () => {
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<signInSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: signInSchema) => {
    try {
      await fetchToken(data);
    } catch (error) {
      reset();
      setError('password', {
        message: 'Email or password are incorrect'
      });
    }
  };


  return { register, handleSubmit, errors, onSubmit };
};