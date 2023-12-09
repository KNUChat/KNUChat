import styled from "styled-components";
import { useChatStore } from "@store/useChatStore";

const ButtonBox = () => {
  const { selectedRoomId, rooms } = useChatStore();

  // Find the room with the selectedRoomId
  const selectedRoom = rooms.find((room) => room.roomId === selectedRoomId);

  // If the room is found and its status is CHAT_PROCEEDING, render the buttons; otherwise, return null
  if (selectedRoom && selectedRoom.roomStatus === "CHAT_PROCEEDING") {
    return (
      <ButtonBoxWrapper>
        <Button>Video Call</Button>
        <Button>Disconnect</Button>
      </ButtonBoxWrapper>
    );
  } else {
    return null;
  }
};

export default ButtonBox;

const ButtonBoxWrapper = styled.div`
  display: inline-block;
  width: 90%;
`;

const Button = styled.div`
  text-align: center;
  background-color:#eeeeee;
  margin-top: 5px;
  margin-bottom: 5px;

`;
