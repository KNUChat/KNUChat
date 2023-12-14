import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components";

interface InputProps {
  maxLength: number;
  height?: string;
}

interface HashTagInputProps extends InputProps {
  defaultValue?: string[];
}
const InputWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  background-color: #fafafa;
  box-sizing: border-box;
  height: ${(props) => props.height || "auto"};
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 2px;
  background-color: #e4e4e4;
  border-radius: 4px;
`;

const TagText = styled.span`
  margin-right: 5px;
`;

const TagCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Counter = styled.span`
  position: absolute;
  top: 17px;
  right: 10px;
  transform: translateY(-50%);
  font-size: 12px;
  color: #888888;
`;
interface HashTagInputRef {
  getTags: () => string[];
}

const HashTagInput = forwardRef<HashTagInputRef, HashTagInputProps>(({ maxLength, height, defaultValue }, ref) => {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<string[]>(defaultValue ? defaultValue : []);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTags(defaultValue ? defaultValue : []);
  }, [defaultValue]);

  const remainingChars = maxLength - value.length;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      setValue(inputValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && value.trim() !== "" && event.nativeEvent.isComposing === false) {
      event.preventDefault();
      setTags((prevTags) => [...prevTags, value.trim()]);
      setValue("");
    }
  };

  const handleTagClose = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  useImperativeHandle(ref, () => ({
    getTags: () => tags, // Expose getTags function to retrieve all tags
  }));

  return (
    <InputWrapper>
      <Input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        height={height}
        placeholder="단어를 입력하세요..."
      />
      <TagContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>
            <TagText>{tag}</TagText>
            <TagCloseButton onClick={() => handleTagClose(tag)}>x</TagCloseButton>
          </Tag>
        ))}
      </TagContainer>
      <Counter>
        {value.length}/{maxLength} 글자
        {remainingChars < 0 && <span> (최대 글자 수 초과)</span>}
      </Counter>
    </InputWrapper>
  );
});

export default HashTagInput;
