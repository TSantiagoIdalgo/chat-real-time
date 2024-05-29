import { FetchData } from '#utils/services/fetchData';
import { RegisterIn, registerSchema } from '#utils/utils/schemas/register-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const usePostUser = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<RegisterIn>({
    resolver: zodResolver(registerSchema)
  });


  const onSubmit = async (data: RegisterIn) => {
    try {
      const response = await FetchData<RegisterIn>({
        method: 'POST',
        uri: 'user',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data,
      });

      if(response) {
        window.location.href = '/chat';
      }
    } catch (error) {
      setError('password', {
        message: 'NETWORK_ERROR'
      });
    }
  };

  return { register, handleSubmit, errors, onSubmit };
};