import styled from "styled-components";

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
    return (
        <ChatWrapper>
            <div>{`SenderId: ${msg.senderId}`}</div>
            <div>{`Message: ${msg.message}`}</div>
            <div>{`${msg.sendTime}`}</div>
        </ChatWrapper>
    );
}

export default Chat;

const ChatWrapper = styled.div`
    border-radius:10px,10px,10px,10px;
`;