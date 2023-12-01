import ChatroomBox from "./ChatroomBox";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ChatListTitle from "./ChatListTitle";

interface Room {
  roomId: number;
  mentorId: number;
  menteeId: number;
  roomStatus: string;
}

const Chatlist = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get('http://52.79.37.100:32253/chat/room', {
          params: {
            id: 1,
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
    <ChatlistWrapper>
      <ChatListTitle/>
      {rooms.map((room) => (
        <ChatroomBox key={room.roomId} room={room}/>
      ))}
    </ChatlistWrapper>
  );
};

export default Chatlist;

const ChatlistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right:3px;
`;