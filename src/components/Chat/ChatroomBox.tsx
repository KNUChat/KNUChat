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
      <p>{room.roomId}</p>
    </ChatroomBoxWrapper>
  );
};

const ChatroomBoxWrapper = styled.div<{ $isSelected?: boolean }>`
  width: 100%;
  text-align: center;
  margin-top: 3px;
  height: auto;
  ${(props) => (props.$isSelected ? "background-color: lightblue;" : "background-color: white;")};
`;


export default ChatroomBox;
