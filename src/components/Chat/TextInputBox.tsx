import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import { WebSocketContext } from '../../websocket/WebSocketProvider';

const TextInputBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const ws = useContext(WebSocketContext);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClickSubmit = () => {
    // 서버로 메시지 전송
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        chat: message,
      }));

      setMessage('');
    } else {
      console.error('WebSocket connection not established.');
    }
  };

  // WebSocket에서 메시지 수신 시 실행되는 콜백 함수
  useEffect(() => {
    const handleWebSocketMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log("Received message:", data);

      // 메시지 출력
      setResponse((prevResponse) => (
        `${data.sendfrom}: ${data.message}\n${prevResponse}`
      ));
    };

    if (ws.current) {
      ws.current.addEventListener('message', handleWebSocketMessage);

      // 컴포넌트가 언마운트될 때 WebSocket 이벤트 리스너 제거
      return () => {
        ws.current.removeEventListener('message', handleWebSocketMessage);
      };
    }
  }, [ws]);

  return (
    <div>
      {/* 응답 메시지 출력 */}
      <div>{response}</div>

      {/* 메시지 입력 창과 전송 버튼 */}
      <div>
        <input type="text" value={message} onChange={handleChangeText} placeholder='write msg'></input>
        <button type="button" onClick={handleClickSubmit}>Send</button>
      </div>
    </div>
  );
};

export default TextInputBox;