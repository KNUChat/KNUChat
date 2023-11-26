import styled from "styled-components";
import ChatPrintBox from "./ChatPrintBox";
import ChatTextBox from "./ChatTextBox";

const Chatroom = () => {
    return (
      <ChatroomWrapper>
        <ChatPrintBox />
        <ChatTextBox />
      </ChatroomWrapper>
    );
  };
  
  export default Chatroom;

const ChatroomWrapper = styled.div`
  display : flex,
  flex-direction : column,
`;