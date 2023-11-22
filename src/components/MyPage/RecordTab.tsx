import styled from "styled-components";
import MyPageBox from "./MyPageBox";
import ContentBox from "./ContentBox";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();
  const handleClickMore = () => {
    navigate("/record");
  };
  return (
    <ContentWrapper>
      <>이력</>
      <ContentBox />
      <DefaultButton onClick={() => handleClickMore()}>더보기</DefaultButton>
    </ContentWrapper>
  );
};

const RecordTab = () => {
  return (
    <RecordTabWrapper>
      <MyPageBox children={<Content />} />
    </RecordTabWrapper>
  );
};

export default RecordTab;

const RecordTabWrapper = styled.div`
  height: 70%;
`;

const DefaultButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  transform: translateY(-50%);
  font-size: 12px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
