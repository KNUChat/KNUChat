import styled from "styled-components";
import ChatManageProfile from "@components/ChatManage/ChatManageProfile";
import ManageList from "@components/ChatManage/ManageList";
import WaitToEnd from "@components/ChatManage/WaitToEnd";

const CommonTemplate = () => {
  return (
    <CommonWrapper>
      <LeftBox>
        <WaitToEnd/>
      </LeftBox>
      <MainBox>
        <ManageList/>
      </MainBox>
      <RightBox>
        <ChatManageProfile/>
      </RightBox>
    </CommonWrapper>
  );
};

export default CommonTemplate;

const CommonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: calc(100vh - 6rem - 8vh);
  width: 75%;
`;

const LeftBox = styled.div`
  flex: 1;
`;
const MainBox = styled.div`
  flex: 3;
`;

const RightBox = styled.div`
  flex: 1;
`;
