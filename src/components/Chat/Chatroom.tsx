import styled from "styled-components";
import ChatPrintBox from "./ChatPrintBox";
import ChatTextBox from "./ChatTextBox";
import ConnectHandler from "@/websocket/ConnectHandler";

const Chatroom = () => {
    return (
      <ChatroomWrapper>

        <ChatPrintBox />
        <ChatTextBox client={null} user={{
          name: ""
        }} />
      </ChatroomWrapper>
    );
  };
  
  export default Chatroom;

const ChatroomWrapper = styled.div`
  display : flex,
  flex-direction : column,
`;