import ContentBox from "@components/MyPage/ContentBox";
import MyPageBox from "@components/MyPage/MyPageBox";
import styled from "styled-components";
import { useState } from "react";
import DefaultInput from "@components/Common/DefaultInput";

const ProfileContent = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const statuses = ["재학", "휴학", "제적", "졸업"];
  const handleClick = (status: string) => {
    setSelectedStatus(status);
  };
  const [textInputs, setTextInputs] = useState([""]);
  console.log(textInputs);
  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newTextInputs = [...textInputs];
    newTextInputs[index] = event.target.value;
    setTextInputs(newTextInputs);
  };

  const handleSave = (index: number) => {
    console.log(`Text Input ${index + 1} Saved: ${textInputs[index]}`);
  };

  const handleAdd = () => {
    setTextInputs([...textInputs, ""]);
  };
  return (
    <ProfileContentWrapper>
      <MyPageBox>
        <p>간단소개글</p>
        <ContentBox>
          <DefaultInput maxLength={400} height="9rem" />
        </ContentBox>
        <p>학력</p>
        <ButtonGroup>
          {statuses.map((status) => (
            <StatusButton key={status} selected={status === selectedStatus} onClick={() => handleClick(status)}>
              {status}
            </StatusButton>
          ))}
        </ButtonGroup>
        <ContentBox
          children={
            <>
              <p>항목</p>
              {textInputs.map((textInput, index) => (
                <div key={index}>
                  {/* <Input type="text" value={textInput} onChange={(event) => handleChange(index, event)} /> */}
                  <DefaultInput defaultValue={textInput} maxLength={1000} height="9rem" />
                  <Button onClick={() => handleSave(index)}>저장</Button>
                  <Button onClick={handleAdd}>추가</Button>
                </div>
              ))}
            </>
          }
        />
        <ContentBox />
      </MyPageBox>
    </ProfileContentWrapper>
  );
};
export default ProfileContent;

const ProfileContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
`;

const StatusButton = styled.button<{ selected: boolean }>`
  background: ${(props) => (props.selected ? "#007BFF" : "#6C757D")};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  width: 70%;
  border: 1px solid #ced4da;
`;
