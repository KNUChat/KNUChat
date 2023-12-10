import styled from "styled-components";
import { useChatStore } from "@store/useChatStore";
import axios from "axios";

const ButtonBox = () => {
  const { selectedRoomId, rooms, setSelectedRoomId,setUpdate } = useChatStore();

  const selectedRoom = rooms.find((room) => room.roomId === selectedRoomId);

  const handleDisconnect = async () => {

    try {
      await axios.patch(`http://52.79.37.100:30952/chat/room/end/${selectedRoomId}`, {
      });
      setUpdate(true);
      setSelectedRoomId(null);
    } catch (error) {
      console.error("Error updating room status:", error);
    }
  };

  const handleVideoCall = async () => {
    try {
     
    } catch (error) {
      console.error("Error connecting Video Call Room:", error);
    }
  };


  if (selectedRoom && selectedRoom.roomStatus === "CHAT_PROCEEDING") {
    return (
      <ButtonBoxWrapper>
        <Button onClick={handleVideoCall}>
          Video Call
        </Button>
        <Button onClick={handleDisconnect}>
          Disconnect
        </Button>
      </ButtonBoxWrapper>
    );
  } else {
    return null;
  }
};

export default ButtonBox;

const ButtonBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
`;

const Button = styled.div`
  text-align: center;
  background-color: white;
  margin-top: 5px;
  border-radius: 5px 5px 5px 5px;
  width: 100%;
`;
