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
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
