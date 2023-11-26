import styled from "styled-components";
import { useState, ChangeEvent } from "react";

const ChatTextBox = () => {
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleClickSend = () => {

    setMessage('');
  };
  return (
    <ChatTextBoxWrapper>
      <input
        type="text"
        placeholder="메시지"
        value={message}
        onChange={handleChange}
      />
      <ButtonBox onClick={handleClickSend}>
        Send
      </ButtonBox>
    </ChatTextBoxWrapper>
  );
};

export default ChatTextBox;

const ChatTextBoxWrapper = styled.div`

`;
const ButtonBox = styled.button`

`;
