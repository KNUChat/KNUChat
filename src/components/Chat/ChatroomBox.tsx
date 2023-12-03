// ChatroomBox.tsx

import React from "react";
import styled from "styled-components";

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
  return (
    <ChatroomBoxWrapper onClick={onClick}>
      <p>{room.roomId}</p>
    </ChatroomBoxWrapper>
  );
};

export default ChatroomBox;

const ChatroomBoxWrapper = styled.div`
  background-color: white;
  width: 100%;
  text-align: center;
  margin-top: 3px;
  height: auto; // Fix the typo in 'height'
`;
