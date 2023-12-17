import styled, { css } from "styled-components";
import MyPageBox from "@components/MyPage/MyPageBox";
import unlockedIcon from "@/assets/unlock.svg";
import lockedIcon from "@/assets/lock.svg";
import { useEffect, useRef, useState } from "react";
import ContentBox from "@components/MyPage/ContentBox";
import DefaultInput from "@components/Common/DefaultInput";
import HashTagInput from "@components/Common/HashTagInput";
import DateRangePicker from "./DateRangePicker";
import useAddRecord from "@hook/record/useAddRecord";
import { NewRecordProps } from "@api/record";
import { useUserStore } from "@store/useUserStore";
import usePatchRecord from "@hook/record/usePatchRecord";

const AddRecord = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const goalRef = useRef(null);
  const processRef = useRef(null);

  const { userInfo } = useUserStore();

  const userId = parseInt(userInfo.id);
  const [textInputs, setTextInputs] = useState([
    [""], // for 링크
  ]);
  const [editedInputs, setEditedInputs] = useState(Array.from(Array(1), () => []));
  const handleChange = (categoryIndex: number, inputIndex: number, event) => {
    const newInputs = [...textInputs];
    newInputs[categoryIndex][inputIndex] = event.target.value;
    setTextInputs(newInputs);
    // Set edited inputs for later saving
    const newEditedInputs = [...editedInputs];
    newEditedInputs[categoryIndex][inputIndex] = event.target.value;
    setEditedInputs(newEditedInputs);
  };

  const handleAdd = (categoryIndex: number) => {
    setTextInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[categoryIndex].push("");
      return newInputs;
    });
    // Add a blank entry in the edited inputs for consistency
    setEditedInputs((prevEditedInputs) => {
      const newEditedInputs = [...prevEditedInputs];
      newEditedInputs[categoryIndex].push("");
      return newEditedInputs;
    });
  };

  const defaultInputRef = useRef(null);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getRef = (temp: React.MutableRefObject<null>) => {
    if (temp.current) {
      const inputContent = temp.current.value;
      console.log("Content from DefaultInput:", inputContent);
      return inputContent;
    }
  };

  const handleRetrieveTags = () => {
    if (tagRef.current) {
      const tags = tagRef.current.getTags();
      console.log("Retrieved Tags:", tags);
      return tags;
    }
  };
  const { mutate: addRecord } = useAddRecord();

  const handleSubmit = () => {
    const title = getRef(titleRef);
    const tag = handleRetrieveTags();
    const goal = getRef(goalRef);
    const process = getRef(processRef);

    // Use the retrieved values as needed
    console.log("Title:", title);
    console.log("Tag:", tag);
    console.log("Goal:", goal);
    console.log("Process:", process);

    addRecord(
      {
        userId: userId,
        title: title,
        description: goal, // Using 'goal' as description for now
        period: "2020.09.01-2020.09.03", // Update this with actual period
        achievement: process, // Using 'process' as achievement for now
        hashtag: tag || ["DefaultTag"],
      } // Default tag if no tags retrieved
    ); // Pass recordData to useAddRecord hook
  };

  return (
    <AddRecordWrapper>
      <MyPageBox>
        <AddRecordHeader>
          <p>이력 작성하기</p>
          <LockTab>
            <p>공개여부</p>
            <LockButton className={isDarkMode ? "locked" : ""} onClick={toggleDarkMode} isDarkMode={isDarkMode}>
              <Icon src={isDarkMode ? lockedIcon : unlockedIcon} alt={isDarkMode ? "Locked" : "Unlocked"} isDarkMode={isDarkMode} />
            </LockButton>
          </LockTab>
        </AddRecordHeader>
        <Divider />
        <AddRecordContent>
          <p>제목</p>
          <ContentBox>
            <DefaultInput maxLength={150} height="4rem" ref={titleRef} />
          </ContentBox>
        </AddRecordContent>
        <AddRecordContent>
          <p>기간</p>
          <ContentBox>
            <DateRangePicker />
          </ContentBox>
        </AddRecordContent>
        <AddRecordContent>
          <AddRecordContent>
            <p>태그</p>
            <ContentBox>
              <HashTagInput maxLength={100} ref={tagRef} />
            </ContentBox>
          </AddRecordContent>
          <p>목표</p>
          <ContentBox>
            <DefaultInput maxLength={1000} height="9rem" ref={goalRef} />
          </ContentBox>
        </AddRecordContent>
        <AddRecordContent>
          <p>과정</p>
          <ContentBox>
            <DefaultInput maxLength={1000} height="10rem" ref={processRef} />
          </ContentBox>
        </AddRecordContent>
        <p>링크</p>
        <ContentBox
          children={
            <>
              {textInputs[0].map((textInput, index) => (
                <div key={index}>
                  {/* <Input type="text" value={textInput} onChange={(event) => handleChange(index, event)} /> */}
                  <Input type="text" value={textInput} onChange={(event) => handleChange(0, index, event)} />
                  <RightButton onClick={() => handleAdd(0)}>추가</RightButton>
                </div>
              ))}
            </>
          }
        />
        <ContentFooter>
          <RightButton onClick={() => handleSubmit()}>제출</RightButton>
        </ContentFooter>
      </MyPageBox>
    </AddRecordWrapper>
  );
};

export default AddRecord;

const AddRecordWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const AddRecordHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AddRecordContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface DarkModeButtonProps {
  isDarkMode: boolean;
}

const LockButton = styled.button<DarkModeButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  ${({ isDarkMode }) =>
    isDarkMode &&
    css`
      background-color: black;
    `}
`;

const Icon = styled.img<{ isDarkMode: boolean }>`
  width: 24px;
  height: 24px;
  filter: ${({ isDarkMode }) => (isDarkMode ? "invert(100%)" : "none")};
`;

const Divider = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`;

const LockTab = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  width: 70%;
  border: 1px solid #ced4da;
`;

const RightButton = styled.button`
  max-width: 5rem;
  flex: 8;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #333; /* Change border color to a darker shade */
  font-size: 16px;
  background-color: #fff;
  outline: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #222;
    color: #fff;
  }
`;

const ContentFooter = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
