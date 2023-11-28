// Chatroom.ts

import styled from "styled-components";
import ChatPrintBox from "./ChatPrintBox";
import ChatTextBox from "./ChatTextBox";
import ConnectHandler from "@/websocket/ConnectHandler";
import { CompatClient } from "@stomp/stompjs";
import { useState } from "react";
import ChatPrintTestBox from "./ChatPrintTestBox";
import ChatTitle from "./ChatTitle";

const Chatroom: React.FC = () => {
  const [client, setClient] = useState<CompatClient | null>(null);

  return (
    <ChatroomWrapper>
      <ChatTitle/>
      <ConnectHandler setClient={setClient} />
      <ChatPrintTestBox/>
      <ChatTextBox client={client} />
    </ChatroomWrapper>
  );
};

export default Chatroom;

const ChatroomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
