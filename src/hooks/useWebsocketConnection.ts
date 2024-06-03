import { useState, useEffect } from 'react';

export const useWebSocketConnection = (uri: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const connectWebSocket = () => {
      setConnecting(true);
      const socket = new WebSocket(uri);

      socket.onopen = () => {
        console.log('WebSocket connection established');
        setWs(socket);
        setConnecting(false);
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
        setWs(null);
        setConnecting(false);
      };

      socket.onerror = (error) => {
        console.error('WebSocket error', error);
        setWs(null);
        setConnecting(false);
      };
    };

    connectWebSocket();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ws, connecting };
};