// ChatTextBox.tsx
import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import { CompatClient } from "@stomp/stompjs";
import { useChatStore } from "../../store/store";

interface ChatTextBoxProps {
  client: CompatClient | null;
}

const ChatTextBox: React.FC<ChatTextBoxProps> = ({ client }) => {
  const [message, setMessage] = useState("");
  const setSendTime = useChatStore((state) => state.setSendTime);
  const selectedRoomId = useChatStore((state) => state.selectedRoomId);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const publish = () => {
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" });

    setSendTime(now);

    if (client && client.connected && selectedRoomId) {
      const publishAddress = `/pub/${selectedRoomId}`;

      client.publish({
        destination: publishAddress,
        body: JSON.stringify({
          roomId: selectedRoomId,
          senderId: 1,
          receiverId: 2,
          message: message,
          sendTime: now,
        }),
      });

      setMessage("");
    } else {
      console.error("WebSocket client is not initialized, not connected, or selectedRoomId is not available.");
    }
  };

  return (
    <ChatTextBoxWrapper>
      <InputBox
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

const ChatTextBoxWrapper = styled.div`
  width: 90%;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const InputBox = styled.input`
  align-items: center;
  width: 100%;
`;

const ButtonBox = styled.button``;
