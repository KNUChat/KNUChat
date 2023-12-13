import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "@store/useAuthStore";

const ManageProfile: React.FC = () => {
  const { userId } = useChatStore();
  const {authToken } = useAuthStore();
  const [selectedUserProfile, setSelectedUserProfile] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://52.79.37.100:32100/users/${userId}`,{
          headers: {
            Authorization: `${authToken}`,
          },
        });
        setSelectedUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [ userId]);

  if (!selectedUserProfile) {
    return <LoadingOrErrorComponent />;
  }
  return (
    <ProfileWrapper>
      <Content>
          <div>이름: {selectedUserProfile?.userDto.name}</div>
          <div>Email: {selectedUserProfile?.userDto.email}</div>
          <div>단과대학: {selectedUserProfile?.departmentDtos.Collage}</div>
          <div>학부: {selectedUserProfile?.departmentDtos.department}</div>
          <div>학과: {selectedUserProfile?.departmentDtos.major}</div>
        </Content>
    </ProfileWrapper>
  );
};

export default ManageProfile;

const ProfileWrapper = styled.div`
  text-align: left;
  border-radius:10px 10px 10px 10px;
  background-color: white;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const LoadingOrErrorComponent: React.FC = () => (
  <div>Loading or Error</div>
);

const Content = styled.div`
  margin-left:10px;
`;