import styled from "styled-components";
import MyPageBox from "./MyPageBox";
import ContentBox from "./ContentBox";
import { useNavigate } from "react-router-dom";
import useGetUserProfile from "@hook/user/useGetUserProfile";
import { UserDataProps } from "@api/user";
import { useUserStore } from "@store/useUserStore";

const getStatusColor = (status: string) => {
  switch (status) {
    case "ATTENDING":
      return "rgba(0, 128, 0, 0.3)"; // Green color with 60% opacity for "재학"
    case "ENROLLMENT":
      return "rgba(255, 165, 0, 0.3)"; // Orange color with 60% opacity for "휴학"
    case "SUSPENSION":
      return "rgba(255, 0, 0, 0.3)"; // Red color with 60% opacity for "제적"
    case "GRADUATION":
      return "rgba(0, 0, 255, 0.3)"; // Blue color with 60% opacity for "졸업"
    default:
      return "rgba(0, 0, 0, 0)"; // Default transparent color
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "ATTENDING":
      return "재학"; // "ATTENDING" maps to "재학"
    case "ENROLLMENT":
      return "휴학"; // "ENROLLMENT" maps to "휴학"
    case "SUSPENSION":
      return "제적"; // "SUSPENSION" maps to "제적"
    case "GRADUATION":
      return "졸업"; // "GRADUATION" maps to "졸업"
    default:
      return ""; // Default empty label
  }
};

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
        <StatusWrapper>
          <StatusColor status={userData?.profileDto?.academicStatus}>{getStatusLabel(userData?.profileDto?.academicStatus)}</StatusColor>
          <p>
            |{userData?.profileDto?.admissionDate} - {userData?.profileDto?.graduateDate || "현재"}
          </p>
        </StatusWrapper>
        <UniversityText>경북대학교</UniversityText>
        <DepartmentText>
          {userData &&
            userData?.departmentDtos
              ?.filter((dep) => dep.depCategory === "BASIC")
              .map((item) => {
                return <p>{item.major}</p>;
              })}
        </DepartmentText>
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

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StatusColor = styled.span`
  font-size: 18px;
  font-weight: bold;
  background-color: ${({ status }) => getStatusColor(status)};
  color: black;
`;

const UniversityText = styled.p`
  font-weight: bold;
  font-size: 2rem;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const DepartmentText = styled.div`
  color: #808080; // Grey color for department text
`;
