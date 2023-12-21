import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ChatroomBox from "./ChatroomBox";
import { useChatStore } from "../../store/useChatStore";
import ChatListNav from "./ChatListNav";
import { useAuthStore } from "@store/useAuthStore";
import { useUserStore } from "@store/useUserStore";

const Chatlist: React.FC = () => {
  const { setSelectedRoomId, setRooms, rooms, update, setUpdate, chatstatus } = useChatStore();
  const { userInfo } = useUserStore();
  const userId = Number(userInfo.id);
  const { authToken } = useAuthStore();

  console.log("authToken", authToken);
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get("http://52.79.37.100:30952/chat/room", {
          headers: {
            Authorization: `${authToken}`,
          },
          params: {
            id: userId,
          },
          withCredentials: false,
        });
        setRooms(response.data);
        setUpdate(false);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, [userId, setRooms, update, setUpdate, authToken]);

  const handleRoomClick = (roomId: number) => {
    setSelectedRoomId(roomId);
  };

  return (
    <ChatlistWrapper>
      <ChatListNav />
      <Wrapper>
        <ListWrapper>
          {rooms.map(
            (room) =>
              (chatstatus === "ended" && room.roomStatus === "CHAT_ENDED" && (
                <ChatroomBox key={room.roomId} room={room} onClick={() => handleRoomClick(room.roomId)} />
              )) ||
              (chatstatus === "proceeding" && room.roomStatus === "CHAT_PROCEEDING" && (
                <ChatroomBox key={room.roomId} room={room} onClick={() => handleRoomClick(room.roomId)} />
              )) ||
              (chatstatus === "waiting" && room.roomStatus === "CHAT_WAITING" && (
                <ChatroomBox key={room.roomId} room={room} onClick={() => handleRoomClick(room.roomId)} />
              ))
          )}
        </ListWrapper>
      </Wrapper>
    </ChatlistWrapper>
  );
};

export default Chatlist;

const ChatlistWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  height: 30rem;
  background-color: white;
  border-radius: 10px 10px 10px 10px;
`;

const Wrapper = styled.div`
  height: auto;
`;

const ListWrapper = styled.div`
  padding-top: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px 10px 10px 10px;
  overflow-y: auto;
  height: 30rem;
  margin-top: 0.4rem;

  &::-webkit-scrollbar {
    width: 0.2em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
