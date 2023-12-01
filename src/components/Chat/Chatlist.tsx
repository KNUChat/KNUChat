// Chatlist.tsx
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ChatroomBox from "./ChatroomBox";
import { useChatStore } from "../../store/store";
import ChatListTitle from "./ChatListTitle";

const Chatlist: React.FC = () => {
  const { setSelectedRoomId, userId, setRooms, rooms } = useChatStore();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("http://52.79.37.100:32253/chat/room", {
          params: {
            id: userId,
          },
        });
        console.log(response);
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, [userId, setRooms]);

  const handleRoomClick = (roomId: number) => {
    setSelectedRoomId(roomId);
  };

  return (
    <ChatlistWrapper>
      <ChatListTitle />
      {rooms.map((room) => (
        <ChatroomBox
          key={room.roomId}
          room={room}
          onClick={() => handleRoomClick(room.roomId)}
        />
      ))}
    </ChatlistWrapper>
  );
};

export default Chatlist;

const ChatlistWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
