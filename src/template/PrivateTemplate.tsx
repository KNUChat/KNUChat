import styled from "styled-components";

const PrivateTemplate = () => {
  return (
    <CommonWrapper>
      <MainBox>Main</MainBox>
      <RightBox>Right</RightBox>
    </CommonWrapper>
  );
};

export default PrivateTemplate;

const CommonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: calc(100vh-6rem-8vh);
  width: 75%;
`;

const MainBox = styled.div`
  flex-grow: 4;
`;

const RightBox = styled.div`
  flex-grow: 1;
`;
