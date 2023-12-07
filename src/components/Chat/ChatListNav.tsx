import { useChatStore } from "@store/useChatStore";
import { useEffect } from "react";
import styled, { CSSObject } from "styled-components";

interface NavProps {
  isActive: boolean;
}

const ChatListNav = () => {
  const { chatstatus, setChatStatus } = useChatStore();

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
        <ProceedingNav onClick={handleProceedingClick} isActive={!chatstatus}>
            진행중
        </ProceedingNav>
        <EndedNav onClick={handleEndedClick} isActive={!chatstatus}>
            완료
        </EndedNav>
    </ChatListNavWrapper>
  );
};

export default ChatListNav;

const ChatListNavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const commonNavStyle: CSSObject = {
  textAlign: "center",
  alignItems: "center",
  flex: 1,
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  backgroundColor: "white",
};

const ProceedingNav = styled.div<NavProps>`
  ${commonNavStyle}
  background-color: ${(props) => (props.isActive ? "white" : "#F5F5F7")};
  border-radius: ${(props)=>(props.isActive ? "10px 10px 0px 0px": "10px 0px 0px 0px")};
`;

const EndedNav = styled.div<NavProps>`
  ${commonNavStyle}
  background-color: ${(props) => (props.isActive ? "#F5F5F7" : "white")};
`;
