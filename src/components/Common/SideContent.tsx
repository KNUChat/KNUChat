import MyPageBox from "@components/MyPage/MyPageBox";
import styled from "styled-components";

const SideContent = () => {
  return (
    <SideContentWrapper>
      <MyPageBox children={<>SideContent</>} />
    </SideContentWrapper>
  );
};

export default SideContent;

const SideContentWrapper = styled.div`
  height: auto;
  width: 100%;
`;
