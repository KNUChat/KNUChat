import styled, { css } from "styled-components";
import MyPageBox from "@components/MyPage/MyPageBox";
import unlockedIcon from "@/assets/unlock.svg";
import lockedIcon from "@/assets/lock.svg";
import { useState } from "react";
import ContentBox from "@components/MyPage/ContentBox";
import DefaultInput from "@components/Common/DefaultInput";
import HashTagInput from "@components/Common/HashTagInput";

const AddRecord = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <AddRecordWrapper>
      <MyPageBox>
        <AddRecordHeader>
          <p>이력 작성하기</p>
          <LockButton className={isDarkMode ? "locked" : ""} onClick={toggleDarkMode} isDarkMode={isDarkMode}>
            <Icon src={isDarkMode ? lockedIcon : unlockedIcon} alt={isDarkMode ? "Locked" : "Unlocked"} isDarkMode={isDarkMode} />
          </LockButton>
        </AddRecordHeader>
        <Divider />
        <AddRecordContent>
          <p>제목</p>
          <ContentBox>
            <DefaultInput maxLength={1000} height="10rem" />
          </ContentBox>
        </AddRecordContent>
        <AddRecordContent>
          <AddRecordContent>
            <p>태그</p>
            <ContentBox>
              <HashTagInput maxLength={100} />
            </ContentBox>
          </AddRecordContent>
          <p>목표</p>
          <ContentBox>
            <DefaultInput maxLength={1000} height="10rem" />
          </ContentBox>
        </AddRecordContent>
        <AddRecordContent>
          <p>과정</p>
          <ContentBox>
            <DefaultInput maxLength={1000} height="10rem" />
          </ContentBox>
        </AddRecordContent>
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
