interface Fetching {
    uri: string,
    method: 'GET' | 'PUT' | 'DELETE' | 'POST',
    headers?: Record<string, string>;
    body?: Record<string, string>;
    props?: Record<string, string>
}

export const FetchData = async <T>({ method, headers, body, uri, props }: Fetching) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/${uri}`, {
    method,
    headers,
    body: JSON.stringify(body),
    ...props
  });

  return await response.json() as T;
};