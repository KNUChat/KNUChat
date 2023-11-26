import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import { CompatClient } from "@stomp/stompjs";

interface ChatTextBoxProps {
  client: CompatClient | null;
}

const ChatTextBox: React.FC<ChatTextBoxProps> = ({ client }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const publish = () => {
    if (client && client.connected) {
      client.publish({
        destination: "/pub/1",
        body: JSON.stringify({
          roomId: 1,
          senderId: 1,
          message: message,
        }),
      });

      setMessage("");
    } else {
      console.error("WebSocket client is not initialized or not connected.");
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
      <ButtonBox onClick={publish}>Send</ButtonBox>
    </ChatTextBoxWrapper>
  );
};

export default ChatTextBox;

const ChatTextBoxWrapper = styled.div``;
const ButtonBox = styled.button``;
