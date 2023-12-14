import styled from "styled-components";
import MyPageBox from "./MyPageBox";
import ContentBox from "./ContentBox";
import { useNavigate } from "react-router-dom";
import useGetUserProfile from "@hook/user/useGetUserProfile";
import { UserDataProps } from "@api/user";
import { useUserStore } from "@store/useUserStore";

const Content = () => {
  const navigate = useNavigate();
  const handleClickMore = () => {
    navigate("/profile");
  };
  const { userInfo } = useUserStore();
  const userId = parseInt(userInfo.id);
  console.log("userId", userId);
  const { data } = useGetUserProfile(userId);
  const userData: UserDataProps = data;
  return (
    <ContentWrapper>
      프로필
      <ContentBox>
        <h3>{userData && userData?.profileDto?.academicStatus}</h3>
        <p>경북대학교</p>
        <p>
          {userData &&
            userData?.departmentDtos?.map((item) => {
              return item.major + " ";
            })}
        </p>
      </ContentBox>
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
  height: auto;
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
