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
  const { selectedRoomId, userId } = useChatStore();

  const role = userId === room.mentorId ? "Mentor" : userId === room.menteeId ? "Mentee" : null;

  return (
    <ChatroomBoxWrapper $isSelected={selectedRoomId === room.roomId} onClick={onClick}>
      {room.roomId} {role && `| ${role}`}
    </ChatroomBoxWrapper>
  );
};

export default ChatroomBox;

const ChatroomBoxWrapper = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96%;
  text-align: center;
  margin-bottom: 0.4rem;
  min-height: 2.5rem;
  height: 2.5rem;
  border-radius: 5px 5px 5px 5px;
  ${(props) =>
    props.$isSelected ? "background-color: #D20F1780;" : "background-color: #EEEEEE;"};
`;