import ContentBox from "@components/MyPage/ContentBox";
import MyPageBox from "@components/MyPage/MyPageBox";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RecordContent = () => {
  const navigate = useNavigate();
  const handleClickAddRecord = () => {
    navigate("/addRecord");
  };
  return (
    <RecordContentWrapper>
      <MyPageBox>
        <p>이력</p>
        <button onClick={() => handleClickAddRecord()}>추가</button>
        <ContentBox />
        <ContentBox />
        <ContentBox />
      </MyPageBox>
    </RecordContentWrapper>
  );
};
export default RecordContent;

const RecordContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
