import React from "react";

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
    <div>
      <p>{room.mentorId}</p>
    </div>
  );
};

export default ChatroomBox;
