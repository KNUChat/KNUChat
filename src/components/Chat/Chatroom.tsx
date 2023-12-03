import styled from "styled-components";
import ChatPrintBox from "./ChatPrintBox";
import ChatTextBox from "./ChatTextBox";
import ConnectHandler from "@/websocket/ConnectHandler";
import Title from "./Title";

const Chatroom: React.FC = () => {

  return (
    <ChatroomWrapper>
      <Title text="ChatRoom"/>
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
