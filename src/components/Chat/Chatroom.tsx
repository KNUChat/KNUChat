import styled from "styled-components";
import ChatPrintBox from "./ChatPrintBox";
import ChatTextBox from "./ChatTextBox";
import ConnectHandler from "@/websocket/ConnectHandler";
import { useChatStore } from "@store/useChatStore";

const Chatroom: React.FC = () => {
  const {selectedRoomId} = useChatStore();

  return (
    <ChatroomWrapper>
      <ConnectHandler/>
      <ChatPrintBox key={selectedRoomId}/>
      <ChatTextBox/>
    </ChatroomWrapper>
  );
};

export default Chatroom;

const ChatroomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  margin-bottom: 0.5rem;
`;