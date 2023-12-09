import styled from "styled-components";
import Chatroom from "@components/Chat/Chatroom";
import Chatlist from "@components/Chat/Chatlist";
import ChatProfile from "@components/Chat/Chatprofile";

const CommonTemplate = () => {
  return (
    <CommonWrapper>
      <LeftBox>
        <Chatlist/>
      </LeftBox>
      <MainBox>
        <Chatroom/>
      </MainBox>
      <RightBox>
        <ChatProfile/>
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
