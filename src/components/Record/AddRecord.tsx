import styled, { css } from "styled-components";
import MyPageBox from "@components/MyPage/MyPageBox";
import unlockedIcon from "@/assets/unlock.svg";
import lockedIcon from "@/assets/lock.svg";
import { useRef, useState } from "react";
import ContentBox from "@components/MyPage/ContentBox";
import DefaultInput from "@components/Common/DefaultInput";
import HashTagInput from "@components/Common/HashTagInput";
import DateRangePicker from "./DateRangePicker";
import useAddRecord from "@hook/record/useAddRecord";
import { NewRecordProps } from "@api/record";

const AddRecord = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const goalRef = useRef(null);
  const processRef = useRef(null);

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
        userId: 1,
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
        <button onClick={() => handleSubmit()}>제출</button>
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
