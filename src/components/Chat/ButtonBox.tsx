import styled from "styled-components";
import { useChatStore } from "@store/useChatStore";

const ButtonBox = () => {
  const { selectedRoomId, rooms, setSelectedRoomId } = useChatStore();

  const selectedRoom = rooms.find((room) => room.roomId === selectedRoomId);

  const handleDisconnect = () => {
    setSelectedRoomId(null);
  };

  if (selectedRoom && selectedRoom.roomStatus === "CHAT_PROCEEDING") {
    return (
      <ButtonBoxWrapper>
        <Button onClick={handleDisconnect}>
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
`;

const Button = styled.div`
  text-align: center;
  background-color: #eeeeee;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  width: 90%;
`;