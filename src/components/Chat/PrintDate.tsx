import styled from "styled-components";

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

const PrintDate: React.FC<ChatProps> = ({ msg }) => {
    const [, DatePart,] = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(msg.sendTime) || [];
  
    return <DateWrapper>{DatePart}</DateWrapper>;
  };
  
  export default PrintDate;

const DateWrapper = styled.div`
    text-align:center;
    font-size:15px;
    margin : 0.3rem;
`;
