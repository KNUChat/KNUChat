import React from "react";
import styled from "styled-components";
import { useChatStore } from "@store/useChatStore";

interface Room {
  roomId: number;
  mentorId: number;
  menteeId: number;
  roomStatus: string;
}

interface ChatroomBoxProps {
  room: Room;
  onClick: () => void;
}

const ChatroomBox: React.FC<ChatroomBoxProps> = ({ room, onClick }) => {
  const { selectedRoomId } = useChatStore();

  return (
    <ChatroomBoxWrapper $isSelected={selectedRoomId === room.roomId} onClick={onClick}>
      {room.roomId}
    </ChatroomBoxWrapper>
  );
};

const ChatroomBoxWrapper = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  text-align: center;
  margin-top: 5px;
  height: 2.5rem;
  border-radius: 10px 10px 10px 10px;
  ${(props) => (props.$isSelected ? "background-color: lightblue;" : "background-color: #EEEEEE;")};
`;


export default ChatroomBox;
