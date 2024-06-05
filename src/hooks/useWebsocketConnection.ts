import { useState, useEffect, useRef } from 'react';

export const useWebSocketConnection = (uri: string) => {
  const [connecting, setConnecting] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    const connectWebSocket = () => {
      if (!ws.current) ws.current = new WebSocket(uri);
      setConnecting(true);

      ws.current.onopen = () => {
        console.log('WebSocket connection established');
        setConnecting(false);
      };

      ws.current.onclose = () => {
        console.log('WebSocket connection closed');
        setConnecting(false);
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error', error);
        setConnecting(false);
      };
    };

    connectWebSocket();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws.current, uri]);
  return { ws, connecting };
};