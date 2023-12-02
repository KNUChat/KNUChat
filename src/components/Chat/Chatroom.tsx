import styled from "styled-components";
import ChatPrintBox from "./ChatPrintBox";
import ChatTextBox from "./ChatTextBox";
import ConnectHandler from "@/websocket/ConnectHandler";
import { CompatClient } from "@stomp/stompjs";
import { useChatStore } from "../../store/store"; // Update the import path
import Title from "./Title";
import { useState } from "react";

const Chatroom: React.FC = () => {
  const { selectedRoomId } = useChatStore();

  const [client, setClient] = useState<CompatClient | null>(null);

  return (
    <ChatroomWrapper>
      <Title text="ChatRoom"/>
      <ConnectHandler setClient={setClient} />
      {selectedRoomId && <ChatPrintBox roomId={selectedRoomId} />}
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
