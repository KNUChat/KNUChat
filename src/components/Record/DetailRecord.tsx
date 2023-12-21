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
import useGetRecord from "@hook/record/useGetRecord";
import { useParams } from "react-router-dom";
import { RecordProps } from "@components/MyPage/RecordTab";
import { useMentorStore } from "@store/useMentorStore";

const DetailRecord = ({ recordId }) => {
  const { data } = useGetRecord(recordId);
  const showData: RecordProps = data;
  const [isDarkMode, setIsDarkMode] = useState(showData.hiding);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const goalRef = useRef(null);
  const processRef = useRef(null);

  return (
    <AddRecordWrapper>
      <MyPageBox>
        <AddRecordHeader>
          <h2>이력 자세히보기</h2>
          <LockTab>
            <p>공개여부</p>
            <LockButton className={isDarkMode ? "locked" : ""} isDarkMode={isDarkMode}>
              <Icon src={isDarkMode ? lockedIcon : unlockedIcon} alt={isDarkMode ? "Locked" : "Unlocked"} isDarkMode={isDarkMode} />
            </LockButton>
          </LockTab>
        </AddRecordHeader>
        <Divider />
        <AddRecordContent>
          <p>제목</p>
          <ContentBox>
            <DefaultInput defaultValue={showData.title} maxLength={150} height="4rem" ref={titleRef} />
          </ContentBox>
        </AddRecordContent>
        <AddRecordContent>
          <p>기간</p>
          <ContentBox>
            <p>{showData.period}</p>
          </ContentBox>
        </AddRecordContent>
        <AddRecordContent>
          <AddRecordContent>
            <p>태그</p>
            <ContentBox>
              <HashTagInput defaultValue={showData.hashtags} maxLength={100} ref={tagRef} />
            </ContentBox>
          </AddRecordContent>
          <p>목표</p>
          <ContentBox>
            <DefaultInput defaultValue={showData.achievement} maxLength={1000} height="9rem" ref={goalRef} />
          </ContentBox>
        </AddRecordContent>
        <AddRecordContent>
          <p>과정</p>
          <ContentBox>
            <DefaultInput defaultValue={showData.description} maxLength={1000} height="10rem" ref={processRef} />
          </ContentBox>
        </AddRecordContent>
      </MyPageBox>
    </AddRecordWrapper>
  );
};

export default DetailRecord;

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
