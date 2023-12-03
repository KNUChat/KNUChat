// ChatPrintBox.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useChatStore } from "../../store/store";
import axios from "axios";
import SubHandler from "@/websocket/SubHandler";

interface Message {
  roomId: number;
  senderId: number;
  receiverId: number;
  message: string;
  sendTime: string;
}

const ChatPrintBox: React.FC = () => {
  const [logs, setLogs] = useState<Message[]>([]);
  const {selectedRoomId} = useChatStore();

  useEffect(() => {
    const fetchChatLogs = async () => {
      try {
        if (selectedRoomId) { // Ensure selectedRoomId is truthy before making the request
          const response = await axios.get(`http://52.79.37.100:32253/chat/room/${selectedRoomId}/logs`);

          const formattedLogs = response.data.map((log: Message) => ({
            senderId: log.senderId,
            message: log.message,
            sendTime: log.sendTime,
          }));

          setLogs(formattedLogs);
        }
      } catch (error) {
        console.error("채팅 로그를 불러오는 중 에러 발생:", error);
      }
    };

    fetchChatLogs();
  }, [selectedRoomId]);
  return (
    <ChatPrintWrapper>
      <SubHandler/>
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