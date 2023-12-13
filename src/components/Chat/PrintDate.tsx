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
  msg: Message;
}

const PrintDate: React.FC<ChatProps> = ({ msg }) => {
  const [, DatePart,] = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(msg.sendTime) || [];
  console.log(DatePart);
  return (
    <DateWrapper>
      <LeftLine />
      <TextLine>
         {DatePart} 
      </TextLine>
      <RightLine />
    </DateWrapper>
  );
};

export default PrintDate;

const DateWrapper = styled.div`
  font-size: 15px;
  margin: 0.3rem;
  color: #cccccc;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TextLine = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  position: relative;
`;

const Line = styled.div`
  justify-content: center;
  height: 0.005rem;
  top: 50%;
  width: 38%;
  background-color: #cccccc;
`;

const RightLine = styled(Line)`
  right: 0;
  margin-right: 2px;
  margin-left: 1rem;
`;

const LeftLine = styled(Line)`
  left: 0;
  margin-left: 2px;
  margin-right: 1rem;
`;
