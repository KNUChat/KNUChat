import ChatroomBox from "./ChatroomBox";
import { useEffect, useState } from "react";
import axios from "axios";

interface Room {
  roomId: number;
  mentorName: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const Chatlist = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get('http://52.79.37.100:32253/chat/room', {
          params: {
            Id: 1,
          },
        });
        console.log(response);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div>
      {rooms.map((room) => (
        <ChatroomBox key={room.roomId} room={room} />
      ))}
    </div>
  );
};

export default Chatlist;
