import styled from "styled-components";
import { useChatStore } from "@store/useChatStore";

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

    return (
        <ChatWrapper $isCurrentUser={msg.senderId === userId}>
            <div>{`SenderId: ${msg.senderId}`}</div>
            <div>{`Message: ${msg.message}`}</div>
            <div>{`${msg.sendTime}`}</div>
        </ChatWrapper>
    );
}

export default Chat;

const ChatWrapper = styled.div<{ $isCurrentUser: boolean }>`
    border-radius:10px 10px 10px 10px;
    background-color: ${(props) => (props.$isCurrentUser ? "#FFEB33" : "grey")};
    width:50%
`;