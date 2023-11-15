import styled from "styled-components";
import ProfileTab from "./ProfileTab";
import RecordTab from "./RecordTab";

const MainContent = () => {
  return (
    <MainContentWrapper>
      <ProfileTab />
      <RecordTab />
    </MainContentWrapper>
  );
};

export default MainContent;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
