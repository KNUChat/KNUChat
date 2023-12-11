import styled from "styled-components";
import ManageTitle from "./ManageTitle";
import { useChatStore } from "@store/useChatStore";
import ManageChat from "./ManageChat";

const ManageList = () => {
  const { checked, rooms } = useChatStore();

  return (
    <ManageListWrapper>
      <ManageTitle title={"Waiting Chat List"} />
      {rooms.map((room) => (
        (!checked && room.roomStatus === 'CHAT_WAITING') && (
          <ManageChat
            key={room.roomId}
            room={room}
          />
        ) ||
        (!checked &&room.roomStatus === 'CHAT_ENDED') && (
          <ManageChat
            key={room.roomId}
            room={room}
          />
        )
      ))}
    </ManageListWrapper>
  );
};

export default ManageList;

const ManageListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 35rem;
  background-color: white;
  border-radius: 10px;
  margin-top: 0.5rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
`;
