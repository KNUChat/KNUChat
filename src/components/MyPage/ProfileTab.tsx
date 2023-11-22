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
    <ContentWrapper>
      프로필
      <ContentBox />
      <DefaultButton onClick={() => handleClickMore()}>더보기</DefaultButton>
    </ContentWrapper>
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

const DefaultButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  transform: translateY(-50%);
  font-size: 12px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
