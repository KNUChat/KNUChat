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
      프로필
      <ContentBox />
      <button onClick={() => handleClickMore()}>더보기</button>
    </>
  );
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
