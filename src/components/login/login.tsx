import { useState } from 'react';
import { FetchData } from '../../services/fetch-data';

export default function Login () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();

  const submit = async () => {
    try {
      const result = await FetchData<{ token: string }>({
        method: 'POST',
        uri: 'user/login',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { email, password }
      });
      window.sessionStorage.setItem('XSRF-TOKEN', result.token);
      window.location.href = '/chat';
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  return (
    <div>
      <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={submit} type="button">Submit</button>
      { error && <span>{error}</span>}
    </div>
  );
}