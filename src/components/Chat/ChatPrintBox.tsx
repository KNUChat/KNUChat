// ChatPrintBox.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useChatStore } from "../../store/store";
import SubHandler from "@/websocket/SubHandler";
import { CompatClient } from "@stomp/stompjs";

interface ChatPrintBoxProps {
  roomId: number;
  client: CompatClient | null;
}

interface ChatLog {
  senderId: number;
  receiverId: number;
  message: string;
  sendTime: string;
}

const ChatPrintBox: React.FC<ChatPrintBoxProps> = ({ client, roomId }) => {
  const [logs, setLogs] = useState<ChatLog[]>([]);
  const sendTime = useChatStore((state) => state.sendTime);

  useEffect(() => {
    const fetchChatLogs = async () => {
      try {
        const response = await axios.get(`http://52.79.37.100:32253/chat/room/${roomId}/logs`);

        const formattedLogs = response.data.map((log: ChatLog) => ({
          senderId: log.senderId,
          message: log.message,
          sendTime: log.sendTime,
        }));

        setLogs(formattedLogs);
      } catch (error) {
        console.error("Error fetching chat logs:", error);
      }
    };

    fetchChatLogs();
  }, [roomId, sendTime]);

  return (
    <ChatPrintWrapper>
      <SubHandler client={client} selectedRoomId={roomId}/>
      {logs.map((log, index) => (
        <div key={index}>
          <div>{`SenderId: ${log.senderId} | Message: ${log.message}`}</div>
          <div>{`SendTime: ${log.sendTime}`}</div>
          <hr />
        </div>
      ))}
    </ChatPrintWrapper>
  );
};

export default ChatPrintBox;

const ChatPrintWrapper = styled.div`
  width: 100%;
  height: 30rem;
  align-items: center;
  text-align: center;
  background-color: white;
  margin-top: 3px;
  overflow-y: auto;
`;
