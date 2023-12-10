import styled from "styled-components";
import { useState, ChangeEvent, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";

const ChatTextBox: React.FC = () => {
  const { setSendTime, selectedRoomId, userId, rooms, client } = useChatStore();
  const [message, setMessage] = useState("");

  const selectedRoom = rooms.find((room) => room.roomId === selectedRoomId);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const publish = () => {
    const now = new Date().toISOString();
    const messageType = "TEXT";

    setSendTime(now);

    if (client && client.connected && selectedRoomId) {
      const publishAddress = `/pub/${selectedRoomId}`;

      if (!selectedRoom || selectedRoom.roomStatus !== "CHAT_PROCEEDING") {
        console.log("방 상태가 CHAT_PROCEEDING이 아니거나 선택한 방이 없습니다. 메시지를 전송하지 않습니다.");
        return;
      }

      const receiverId =
        userId === selectedRoom.menteeId ? selectedRoom.menteeId : selectedRoom.mentorId;

      if (message.trim() === "") {
        console.log("메시지가 비어 있습니다. 메시지를 전송하지 않습니다.");
        return;
      }

      try {
        client.publish({
          destination: publishAddress,
          body: JSON.stringify({
            roomId: selectedRoomId,
            senderId: userId,
            receiverId: receiverId,
            message: message,
            sendTime: now,
            chatMessageType: messageType,
          }),
        });
        console.log("메시지 전송 성공");
      } catch (error) {
        console.log("메시지 전송 오류:", error);
      }
      setMessage("");
      console.log("WebSocket 연결 상태:", client.connected ? "연결됨" : "연결되지 않음");
    } else {
      console.error("WebSocket 클라이언트가 초기화되지 않았거나 연결되지 않았거나 selectedRoomId가 사용할 수 없습니다.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      publish();
    }
  };

  useEffect(() => {
    setMessage("");
  }, [selectedRoomId]);

  return (
    <ChatTextBoxWrapper>
      <InputBox
        type="text"
        placeholder="  메시지"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <ButtonBox onClick={publish}>Send</ButtonBox>
    </ChatTextBoxWrapper>
  );
};

export default ChatTextBox;

const ChatTextBoxWrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 2rem;
  background-color: white;
  border-radius: 0px 0px 10px 10px;
  margin-top: 0.1rem;
`;

const InputBox = styled.input`
  align-items: center;
  width: 100%;
  border-radius: 5px;
  border: 0.1px;
  height: auto;
`;

const ButtonBox = styled.button`
  border-radius: 5px;
  border: 0.1px;
  margin-right: 5px;
`;
