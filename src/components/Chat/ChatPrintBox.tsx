import { useEffect, useState } from "react";
import styled from "styled-components";
import { useChatStore } from "../../store/useChatStore";
import axios from "axios";
import SubHandler from "@/websocket/SubHandler";
import Chat from "./Chat";
import Title from "./Title";

interface Message {
  roomId: number;
  senderId: number;
  receiverId: number;
  message: string;
  sendTime: string;
  chatMessageType: string;
}

const ChatPrintBox: React.FC = () => {
  const [logs1, setLogs1] = useState<Message[]>([]);
  const [logs2, setLogs2] = useState<Message[]>([]);
  const { selectedRoomId, messages, userId } = useChatStore();

  useEffect(() => {
    const fetchChatLogs = async () => {
      try {
        if (selectedRoomId) {
          const response = await axios.get(`http://52.79.37.100:30952/chat/room/${selectedRoomId}/logs`);

          const formattedLogs = response.data.map((log: Message) => ({
            senderId: log.senderId,
            message: log.message,
            sendTime: log.sendTime,
          }));
          setLogs1(formattedLogs);
          setLogs2([]);
        }
      } catch (error) {
        console.error("채팅 로그를 불러오는 중 에러 발생:", error);
      }
    };

    fetchChatLogs();
  }, [selectedRoomId]);

  useEffect(() => {
    if (selectedRoomId) {
      const existingLogs = [...logs2];
      const newLogs = messages.filter((message) => message.roomId === selectedRoomId);
      setLogs2([...existingLogs, ...newLogs]);
    }
  }, [messages, selectedRoomId]);

  return (
    <ChatPrintWrapper>
      <Title name={"null"}/>
      <SubHandler />
      <ChatLogWrapper>
        {logs1.map((log, index) => (
          <ChatBox key={index} $isCurrentUser={log.senderId === userId}>
            <Chat msg={log}/>
          </ChatBox>
        ))}
        {logs2.map((log, index) => (
          <ChatBox key={index} $isCurrentUser={log.senderId === userId}>
            <Chat msg={log}/>
          </ChatBox>
        ))}
      </ChatLogWrapper>
    </ChatPrintWrapper>
  );
};

export default ChatPrintBox;

const ChatPrintWrapper = styled.div`
  width: 100%;
  height: 33rem;
  align-items: center;
  text-align: center;
  background-color: white;
  border-radius:10px 10px 0px 0px;
`;

const ChatLogWrapper = styled.div`
  display: inline-block;
  height: 33rem;
  justify-content:center;
  overflow-y: auto;
  width: 98%;
  background-color: #F5F5F7;

  &::-webkit-scrollbar {
    width: 0.2em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const ChatBox = styled.div<{$isCurrentUser:boolean}>`
  display: flex;
  margin-top: 8px;
  justify-content: ${(props) => (props.$isCurrentUser ? "flex-end" : "flex-start")};
`;