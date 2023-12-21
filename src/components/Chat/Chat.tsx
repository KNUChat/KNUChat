import styled from "styled-components";
import { useUserStore } from "@store/useUserStore";

interface Message {
    roomId: number;
    senderId: number;
    receiverId: number;
    message: string;
    chatMessageType: string;
    sendTime: string;
}

interface ChatProps {
    msg:Message;
  }

const Chat:React.FC<ChatProps> =({msg})=> {
    const { userInfo } = useUserStore();
    const userId = Number(userInfo.id);
    const [, , timePart] = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(msg.sendTime) || [];
    const parsedTime = timePart ? new Date(`1970-01-01T${timePart}:00Z`).toLocaleTimeString("en-US", { timeZone: "Asia/Seoul", hour12: true, hour:"2-digit",minute: "2-digit" }) : "";
    
    return (
        <Wrapper $isCurrentUser={msg.senderId === userId}>
            <TimeWrapper>
                {msg.senderId === userId ? <ChatTime $isCurrentUser={msg.senderId === userId}>{`${parsedTime}`}</ChatTime>:null}
            </TimeWrapper>
            <ChatContentWrapper>
                <ChatWrapper $isCurrentUser={msg.senderId === userId}>
                {msg.chatMessageType === "NOTICE" || msg.message === "CONNECTED"
                    ? "Video call Start"
                    : msg.chatMessageType === "NOTICE" || msg.message === "DISCONNECTED"
                    ? "Video call End"
                    : msg.message
                }
                </ChatWrapper>
            </ChatContentWrapper>
            <TimeWrapper>
                {msg.senderId !== userId?<ChatTime $isCurrentUser={msg.senderId === userId}>{`${parsedTime}`}</ChatTime>:null}
            </TimeWrapper>
        </Wrapper>       
    );
}

export default Chat;

const Wrapper = styled.div<{ $isCurrentUser: boolean }>`
    width:65;
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

const ChatWrapper = styled.div<{ $isCurrentUser: boolean }>`
    display: flex;
    flex-direction: column;
    border-radius:5px 5px 5px 5px;
    background-color: ${(props) => (props.$isCurrentUser ? "#FFEB33" : "white")};
    margin-left: ${(props) => (props.$isCurrentUser ? "0.2rem" : "0.7rem")};
    margin-right: ${(props) => (props.$isCurrentUser ? "0.1rem" : "0.2rem")};
    text-align: left;
    padding:0.3rem;
    width:auto;
    max-width:15rem;
    overflow-wrap: break-word;
`;