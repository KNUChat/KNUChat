// WebSocketProvider.tsx
import React, { useRef, useEffect, createContext, ReactNode } from 'react';

interface WebSocketContextProps {
  subscribeToRoom: (roomid: string) => void;
  sendMessage: (roomid: string, message: string) => void;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const webSocketUrl = 'ws://localhost:8080/example';
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(webSocketUrl);

    ws.current.onopen = () => {
      console.log('Connected to ' + webSocketUrl);
    };

    ws.current.onclose = (error) => {
      console.log('Disconnected from ' + webSocketUrl);
      console.log(error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [webSocketUrl]);

  const subscribeToRoom = (roomid: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        command: 'subscribe',
        roomid: roomid,
      }));
    }
  };

  const sendMessage = (roomid: string, message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        command: 'send',
        roomid: roomid,
        chat: message,
      }));
    }
  };

  return (
    <WebSocketContext.Provider value={{ subscribeToRoom, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider, WebSocketContext };
