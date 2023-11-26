import React from "react";

interface Room {
  roomId: number;
  mentorName: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ChatroomBoxProps {
  room: Room;
}

const ChatroomBox: React.FC<ChatroomBoxProps> = ({ room }) => {
  return (
    <div>
      <p>Mentor: {room.mentorName}</p>
    </div>
  );
};

export default ChatroomBox;
