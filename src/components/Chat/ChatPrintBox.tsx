import { useEffect, useState } from "react";
import styled from "styled-components";

interface ChatPrintBoxProps {
  roomId: number;
}

interface ChatLog {
  userId: string;
  timestamp: string;
  content: string;
}

const ChatPrintBox: React.FC<ChatPrintBoxProps> = ({ roomId }) => {
  const [logs, setLogs] = useState<ChatLog[]>([]);

  useEffect(() => {
    const fetchChatLogs = async () => {
      try {
        const response = await fetch(`/api/chat/room/1/logs`);
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching chat logs:", error);
      }
    };

    fetchChatLogs();
  }, [roomId]);

  return (
    <ChatPrintWrapper>
      {logs.map((log, index) => (
        <div key={index} className={log.userId === "user1" ? "special-message" : ""}>
          {`${log.userId} : ${log.content} (${log.timestamp})`}
        </div>
      ))}
    </ChatPrintWrapper>
  );
};

export default ChatPrintBox;

const ChatPrintWrapper = styled.div`
  width: auto;
`;