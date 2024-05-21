import { signInSchema } from 'src/utils/schemas/login-schema';

export const fetchToken = async (data: signInSchema) => {
  await fetch(`${import.meta.env.VITE_APP_API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    redirect: 'follow'
  });
};