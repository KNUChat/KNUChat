import { useState } from "react";
import styled from "styled-components";

interface InputProps {
  maxLength: number;
  height?: string;
}

const InputWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Input = styled.textarea<InputProps>`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  background-color: #fafafa;
  box-sizing: border-box;
  height: ${(props) => props.height || "auto"};
  resize: none; /* 크기 조절 비활성화 */

  &:focus {
    outline: none;
    background-color: #e4e4e4;
  }
`;

const Counter = styled.span`
  position: absolute;
  right: 10px;
  bottom: -15px;
  font-size: 12px;
  color: #888888;
`;

const DefaultInput = ({ maxLength, height }: InputProps) => {
  const [value, setValue] = useState("");
  const remainingChars = maxLength - value.length;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      setValue(inputValue);
    }
  };

  return (
    <InputWrapper>
      <Input value={value} onChange={handleChange} maxLength={maxLength} height={height} rows={value.split("\n").length} />
      <Counter>
        {value.length}/{maxLength} 글자
        {remainingChars < 0 && <span> (최대 글자 수 초과)</span>}
      </Counter>
    </InputWrapper>
  );
};

export default DefaultInput;
