import styled from "styled-components";
import MyPageBox from "./MyPageBox";

const RecordTab = () => {
  return (
    <RecordTabWrapper>
      <MyPageBox children={<>이력</>} />
    </RecordTabWrapper>
  );
};

export default RecordTab;

const RecordTabWrapper = styled.div`
  height: 70%;
`;
