type Prop = Record<string, string>

interface IFetch {
  method: 'GET' | 'PUT' | 'POST' | 'DELETE',
  uri: string;
  body?: Prop;
  headers?: Prop;
  props?: Prop;
}

export const FetchData = async <T>({ method, uri, headers, body, props }: IFetch) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/${uri}`, {
    method,
    headers,
    body: JSON.stringify(body),
    ...props
  });

  if (!response.ok) throw new Error('Failed to fetch data');

  return response.json() as T;
};