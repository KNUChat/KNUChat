// ChatTextBox.tsx
import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import { useChatStore } from "../../store/store";

interface Message {
  roomId: number;
  senderId: number;
  receiverId: number;
  message: string;
  sendTime: string;
}

const ChatTextBox: React.FC = () => {
  const {setSendTime, selectedRoomId, userId, rooms, addMessage,client} = useChatStore();
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const publish = () => {
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" });
    const formattedNow = now.split(", ").join("T").replace(/\//g, "-");

    setSendTime(formattedNow);

    if (client && client.connected && selectedRoomId) {
      const publishAddress = `/pub/${selectedRoomId}`;

      const selectedRoom = rooms.find((room: { roomId: number; }) => room.roomId === selectedRoomId);
      console.log(selectedRoomId)
      if (selectedRoom) {
        const receiverId = userId === selectedRoom.menteeId ? selectedRoom.mentorId : selectedRoom.menteeId;
        
        try{
          client.publish({
          destination: publishAddress,
          body: JSON.stringify({
            roomId: selectedRoomId,
            senderId: userId,
            receiverId: receiverId,
            message: message,
            sendTime: "2017-03-16T17:40:00",
          }),
        });
          console.log("publish successfully");
        }catch(error){
          console.log("publish error:",error);
        }
        setMessage("");

        const newMessage: Message = {
          roomId: selectedRoomId,
          senderId: userId,
          receiverId: receiverId,
          message: message,
          sendTime: formattedNow,
        };

        addMessage(newMessage);
        console.log("WebSocket Connection Status:", client.connected ? "Connected" : "Not Connected");
      } else {
        console.error("Selected room not found.");
      }
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
