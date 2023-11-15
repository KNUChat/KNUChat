import styled from "styled-components";
import MyPageBox from "./MyPageBox";
import ContentBox from "./ContentBox";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();
  const handleClickMore = () => {
    navigate("/profile");
  };
  return (
    <>
      <>이력</>
      <ContentBox />
      <button onClick={() => handleClickMore()}>더보기</button>
    </>
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
