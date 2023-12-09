import React, { useState, useEffect, forwardRef, RefObject } from "react";
import styled from "styled-components";

interface InputProps {
  maxLength: number;
  height?: string;
  defaultValue?: string;
}

interface DefaultInputProps extends InputProps {
  forwardedRef?: React.Ref<HTMLTextAreaElement>;
}

const InputWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const Input = styled.textarea<InputProps>`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  background-color: #fafafa;
  box-sizing: border-box;
  height: ${(props) => props.height || "auto"};
  resize: none;

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

const DefaultInput = forwardRef<HTMLTextAreaElement, DefaultInputProps>(({ maxLength, height, defaultValue }: DefaultInputProps, ref) => {
  const [value, setValue] = useState("");

  const remainingChars = maxLength - value.length;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      setValue(inputValue);
    }
  };
  if (defaultValue && ref) {
    (ref as RefObject<HTMLInputElement>)!.current!.value = defaultValue;
  }
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <InputWrapper>
      <Input
        ref={ref as React.RefObject<HTMLTextAreaElement>}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        height={height}
        rows={value.split("\n").length}
      />
      <Counter>
        {value.length}/{maxLength} 글자
        {remainingChars < 0 && <span> (최대 글자 수 초과)</span>}
      </Counter>
    </InputWrapper>
  );
});

export default DefaultInput;
