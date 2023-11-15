import styled from "styled-components";
import MyPageBox from "./MyPageBox";

const Content = () => {
  return <>프로필</>;
};

const ProfileTab = () => {
  return (
    <ProfileTabWrapper>
      <MyPageBox children={<Content />} />
    </ProfileTabWrapper>
  );
};

export default ProfileTab;

const ProfileTabWrapper = styled.div`
  height: 30%;
  width: 100%;
`;
