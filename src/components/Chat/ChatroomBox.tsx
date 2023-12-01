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
}

const ChatroomBox: React.FC<ChatroomBoxProps> = ({ room }) => {
  return (
    <ChatroomBoxWrapper>
      <p>{room.mentorId}</p>
    </ChatroomBoxWrapper>
  );
};

export default ChatroomBox;


const ChatroomBoxWrapper = styled.div`
  background-color: white;
  width: 100%;
  text-align: center;
  margin-top: 3px;
  hight: auto;
`;