import styled from "styled-components";
import Chatroom from "@components/Chat/Chatroom";
import Chatlist from "@components/Chat/Chatlist";
import Chatprofile from "@components/Chat/Chatprofile";

const CommonTemplate = () => {
  return (
    <CommonWrapper>
      <LeftBox>
        
      </LeftBox>
      <MainBox>
        <Chatroom/>
      </MainBox>
      <RightBox>
        <Chatprofile/>
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
  flex-grow: 1;
`;
const MainBox = styled.div`
  flex-grow: 3;
`;

const RightBox = styled.div`
  flex-grow: 1;
`;
