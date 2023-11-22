import ContentBox from "@components/MyPage/ContentBox";
import MyPageBox from "@components/MyPage/MyPageBox";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RecordContent = () => {
  const [isDetailedView, setIsDetailedView] = useState(false);

  const navigate = useNavigate();

  const handleClickAddRecord = () => {
    navigate("/addRecord");
  };

  const handleClickMore = () => {
    setIsDetailedView(!isDetailedView);
  };
  return (
    <RecordContentWrapper>
      <MyPageBox>
        <p>이력</p>
        <button onClick={() => handleClickAddRecord()}>추가</button>
        <ContentBox>
          {isDetailedView ? <div>{/* 자세한 내용을 보여주는 부분 */}</div> : <div>{/* 간략한 내용을 보여주는 부분 */}</div>}
          <DetailButton onClick={() => handleClickMore()}>{isDetailedView ? "간략히 보기" : "자세히 보기"}</DetailButton>
        </ContentBox>
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
`;
