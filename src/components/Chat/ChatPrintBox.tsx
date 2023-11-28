import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

interface ChatPrintBoxProps {
  roomId: number;
}

interface ChatLog {
  userId: number;
  timestamp: string;
  content: string;
}

const ChatPrintBox: React.FC<ChatPrintBoxProps> = ({ roomId }) => {
  const [logs, setLogs] = useState<ChatLog[]>([]);

  useEffect(() => {
    roomId = 1
    const fetchChatLogs = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://52.79.37.100:32253/chat/room/${roomId}/logs`,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        // 데이터를 상태로 업데이트
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching chat logs:", error);
      }
    };

    fetchChatLogs();
  }, [roomId]);

  return (
    <ChatPrintWrapper>
      {logs.map((log, index) => (
        <div key={index}>
          {`${log.userId} : ${log.content}`}
        </div>
      ))}
    </ChatPrintWrapper>
  );
};

export default ChatPrintBox;

const ChatPrintWrapper = styled.div`
  width: auto;
`;