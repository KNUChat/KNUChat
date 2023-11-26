import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import { CompatClient } from "@stomp/stompjs";

interface ChatTextBoxProps {
  client: CompatClient | null;
  user: { name: string };
}

const ChatTextBox: React.FC<ChatTextBoxProps> = ({ client, user }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClickSend = () => {
    if (client) {
      const roomId = "your_room_id"; // 실제 방의 ID로 대체

      client.send(
        "/백엔드와 협의한 api주소",
        {},
        JSON.stringify({
          roomId: roomId,
          senderId: user.name,
          message: message, // 변수명 수정
        })
      );

      setMessage('');
    } else {
      console.error('WebSocket client is not initialized.');
    }
  };

  return (
    <ChatTextBoxWrapper>
      <input
        type="text"
        placeholder="메시지"
        value={message}
        onChange={handleChange}
      />
      <ButtonBox onClick={handleClickSend}>
        Send
      </ButtonBox>
    </ChatTextBoxWrapper>
  );
};

export default ChatTextBox;

const ChatTextBoxWrapper = styled.div`

`;
const ButtonBox = styled.button`

`;