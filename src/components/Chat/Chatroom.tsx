import styled from "styled-components";
import ChatPrintBox from "./ChatPrintBox";
import ChatTextBox from "./ChatTextBox";
import ConnectHandler from "@/websocket/ConnectHandler";
import Title from "./Title";
import { useChatStore } from "@store/useChatStore";

const Chatroom: React.FC = () => {
  const {selectedRoomId} = useChatStore();

  return (
    <ChatroomWrapper>
      <Title text={`${selectedRoomId}`}/>
      <ConnectHandler/>
      <ChatPrintBox/>
      <ChatTextBox/>
    </ChatroomWrapper>
  );
};

export default Chatroom;

const ChatroomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
