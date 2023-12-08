import styled from "styled-components";
import { useChatStore } from "@store/useChatStore";
import { useEffect, useState } from "react";

interface Message {
    roomId: number;
    senderId: number;
    receiverId: number;
    message: string;
    sendTime: string;
}

interface ChatProps {
    msg:Message;
  }

const Chat:React.FC<ChatProps> =({msg})=> {
    const {userId} = useChatStore();
    const [, datePart, timePart] = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(msg.sendTime) || [];

    const parsedTime = timePart ? new Date(`1970-01-01T${timePart}:00Z`).toLocaleTimeString("en-US", { timeZone: "Asia/Seoul", hour12: true, hour:"2-digit",minute: "2-digit" }) : "";
      
    return (
        <Wrapper $isCurrentUser={msg.senderId === userId}>
            <TimeWrapper>
                <ChatTime $isCurrentUser={msg.senderId === userId}>{`${parsedTime}`}</ChatTime>
            </TimeWrapper>
            <ChatContentWrapper>
                {msg.senderId !== userId && <ChatContent>{`Id: ${msg.senderId}`}</ChatContent>}
                <ChatWrapper $isCurrentUser={msg.senderId === userId}>
                    {msg.message}
                </ChatWrapper>
            </ChatContentWrapper>
        </Wrapper>       
    );
}

export default Chat;

const Wrapper = styled.div<{ $isCurrentUser: boolean }>`
    width:60%;
    display: flex;
    flex-direction: row;
    margin-right: 10px;
    justify-content: ${(props) => (props.$isCurrentUser ? "flex-end" : "flex-start")};
`;

const TimeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    font-size: 12px;
`;


const ChatTime = styled.div<{ $isCurrentUser: boolean }>`
    text-align: ${(props) => (props.$isCurrentUser ? "right" : "left")};
`;

const ChatContentWrapper = styled.div`
    display : flex;
    flex-direction: column;
`;

const ChatContent = styled.div`
    text-align: left;
    margin-right: auto;
    margin-left: 3px;
    font-size:12px;
`;

const ChatWrapper = styled.div<{ $isCurrentUser: boolean }>`
    display: flex;
    flex-direction: column;
    border-radius:5px 5px 5px 5px;
    background-color: ${(props) => (props.$isCurrentUser ? "#FFEB33" : "#EEEEEE")};
    text-align: left;
    margin-left: 3px;
    padding:8px;
    width:auto;
    max-width:15rem;
    overflow-wrap: break-word;
`;