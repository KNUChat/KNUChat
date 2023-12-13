import { useChatStore } from "@store/useChatStore";
import { useEffect } from "react";
import styled, { CSSObject } from "styled-components";

const ChatListNav = () => {
  const { chatstatus, setChatStatus,setSelectedRoomId} = useChatStore();

  const handleProceedingClick = () => {
    setChatStatus("proceeding");
    setSelectedRoomId(null);
  };

  const handleEndedClick = () => {
    setChatStatus("ended");
    setSelectedRoomId(null);
  };

  const handleWaitingClick = () => {
    setChatStatus("waiting");
    setSelectedRoomId(null);
  };
  
  useEffect(() => {
  }, [chatstatus]);

  return (
    <ChatListNavWrapper>
        <ProceedingNav $isActive={chatstatus === "waiting"} onClick={handleWaitingClick}>
        대기중
        </ProceedingNav>
        <WaitingNav $isActive={chatstatus === "proceeding"} onClick={handleProceedingClick}>
          진행중
        </WaitingNav>
        <EndedNav $isActive={chatstatus === "ended"} onClick={handleEndedClick}>
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
  background-color:#F5F5F7;
  width: 100%;
`;

const commonNavStyle: CSSObject = {
  textAlign: "center",
  alignItems: "center",
  flex: 1,
  display: "flex",
  justifyContent: "center",
  cursor: "pointer",
  backgroundColor: "#eeeeee",
};

const ProceedingNav = styled.div<{ $isActive?: boolean,chatstatus?:string }>`
  ${commonNavStyle}
  background-color: ${(props) => (props.$isActive || props.chatstatus === "proceeding" ? "white" : "#F5F5F7")};
  border-radius: ${(props) => (props.$isActive || props.chatstatus === "proceeding" ? "10px 10px 0px 0px" : "0px 0px 0px 0px")};
`;

const WaitingNav = styled.div<{ $isActive?: boolean,chatstatus?:string }>`
  ${commonNavStyle}
  background-color: ${(props) => (props.$isActive || props.chatstatus === "waiting" ? "white" : "#F5F5F7")};
  border-radius: ${(props) => (props.$isActive || props.chatstatus === "waiting" ? "10px 10px 0px 0px" : "0px 0px 0px 0px")};
`;

const EndedNav = styled.div<{ $isActive?: boolean, chatstatus?:string }>`
  ${commonNavStyle}
  background-color: ${(props) => (props.$isActive || props.chatstatus === "ended" ? "white" : "#F5F5F7")};
  border-radius: ${(props)=>(props.$isActive || props.chatstatus === "ended" ? "10px 10px 0px 0px": "0px 10px 0px 0px")};
`;
