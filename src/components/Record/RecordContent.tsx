import ContentBox from "@components/MyPage/ContentBox";
import MyPageBox from "@components/MyPage/MyPageBox";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RecordSearchProps } from "@api/record";
import useSearchRecord from "@hook/record/useSearchRecord";
import { RecordProps } from "@components/MyPage/RecordTab";

const RecordContent = () => {
  const [detailedViews, setDetailedViews] = useState<boolean[]>([]); // 각 레코드의 상세 보기 상태를 관리하는 배열
  const temp: RecordSearchProps = {
    searchWord: "1",
    type: "user",
    page: 0,
  };
  const { data: recordData } = useSearchRecord(temp);
  console.log(recordData);

  const navigate = useNavigate();

  const handleClickAddRecord = () => {
    navigate("/addRecord");
  };

  const toggleDetailedView = (index: number) => {
    setDetailedViews((prev) => {
      const updatedViews = [...prev];
      updatedViews[index] = !updatedViews[index]; // 레코드의 상세 보기 상태를 토글
      return updatedViews;
    });
  };

  return (
    <RecordContentWrapper>
      <MyPageBox>
        <p>이력</p>
        <button onClick={() => handleClickAddRecord()}>추가</button>
        {recordData?.recordResponses &&
          recordData?.recordResponses.map((record: RecordProps, index: number) => {
            return (
              <ContentBox key={index}>
                <ContentHeader>
                  <p
                    onClick={() => {
                      console.log("page");
                    }}
                  >
                    {record.title}
                  </p>
                  <p>{record.hashtags}</p>
                  <p>{record.period}</p>
                </ContentHeader>
                <ContentMain isDetailedView={detailedViews[index] || false}>
                  <p>{record.description}</p>
                </ContentMain>
                <DetailButton onClick={() => toggleDetailedView(index)}>{detailedViews[index] ? "간략히 보기" : "자세히 보기"}</DetailButton>
              </ContentBox>
            );
          })}
      </MyPageBox>
    </RecordContentWrapper>
  );
};

export default RecordContent;

const RecordContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const DetailButton = styled.button`
  position: absolute;
  bottom: 2px;
  right: 10px;
  transform: translateY(-40%);
  font-size: 12px;
  color: #888888;
  border: 0px;
  background-color: #fafafa;
`;

const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

const ContentMain = styled.div<{ isDetailedView: boolean }>`
  display: ${({ isDetailedView }) => (isDetailedView ? "flex" : "none")};
  flex-direction: column;
`;
