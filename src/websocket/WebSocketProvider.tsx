import React, { useRef, useEffect } from 'react';

const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const webSocketUrl = `ws://localhost:8080/example`;
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(webSocketUrl);
      ws.current.onopen = () => {
        console.log("connected to " + webSocketUrl);
      };
      ws.current.onclose = (error) => {
        console.log("disconnect from " + webSocketUrl);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error " + webSocketUrl);
        console.log(error);
      };
      ws.current.onmessage = (event) => {
        // 서버로부터 메시지를 수신하면 이 부분에서 처리
        const data = JSON.parse(event.data);
        console.log("Received message:", data);
      };
    }

    // 컴포넌트가 언마운트될 때 WebSocket을 닫음
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [webSocketUrl]);

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
