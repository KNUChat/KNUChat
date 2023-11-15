import styled from "styled-components";
import MainContent from "@components/MyPage/MainContent";
import SideContent from "@components/Common/SideContent";

const PrivateTemplate = () => {
  return (
    <CommonWrapper>
      <MainBox>
        <MainContent />
      </MainBox>
      <RightBox>
        <SideContent />
      </RightBox>
    </CommonWrapper>
  );
};

export default PrivateTemplate;

const CommonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: calc(100vh-6rem-8vh);
  width: 75%;
`;

const MainBox = styled.div`
  flex-grow: 4;
  height: 100%;
  max-width: 80%;
`;

const RightBox = styled.div`
  flex-grow: 1;
  max-width: 20%;
`;
