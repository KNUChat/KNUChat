import { useChatStore } from "@store/useChatStore";
import { useEffect } from "react";
import styled from "styled-components";

const ChatListNav = () => {
  const {chatstatus,setChatStatus } = useChatStore();

  const handleProceedingClick = () => {
    setChatStatus(false);
  };

  const handleEndedClick = () => {
    setChatStatus(true);
  };
  
  useEffect(() => {
    console.log(chatstatus);
  }, [chatstatus]);

  return (
    <ChatListNavWrapper>
      <EndedNav onClick={handleEndedClick}>
         Ended 
      </EndedNav>
      <ProceedingNav onClick={handleProceedingClick}>
         Proceeding 
      </ProceedingNav>
    </ChatListNavWrapper>
  );
}

export default ChatListNav;

const ChatListNavWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const ProceedingNav = styled.div`
    text-align: center;
    align-items: center;
    margin-left: 10px;
`;

const EndedNav = styled.div`
    text-align: center;
    align-items: center;
    margin-right: 10px;
`;