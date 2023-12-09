// profile.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useChatStore } from "../../store/useChatStore";

const Profile: React.FC = () => {
  const { selectedRoomId, rooms, userId } = useChatStore();
  const [selectedUserProfile, setSelectedUserProfile] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {

      const selectedRoom = rooms.find(room => room.roomId === selectedRoomId);

      if (selectedRoom) {
        try {
          const userIdToFetch = selectedRoom.menteeId === userId
            ? selectedRoom.mentorId
            : selectedRoom.menteeId;

          const response = await axios.get(`http://52.79.37.100:31338/users/${userIdToFetch}`);
          setSelectedUserProfile(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [selectedRoomId, rooms, userId]);

  if (!selectedUserProfile) {
    return <LoadingOrErrorComponent />;
  }

  return (
    <ProfileWrapper>
      <Content>
        <div>Name: {selectedUserProfile.userDto.name}</div>
        <div>Email: {selectedUserProfile.userDto.email}</div>
        <div>Collage: {selectedUserProfile.departmentDtos.Collage}</div>
        <div>Department: {selectedUserProfile.departmentDtos.department}</div>
        <div>Mayjor: {selectedUserProfile.departmentDtos.major}</div>
      </Content>
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  text-align: left;
  border-radius:5px 5px 5px 5px;
  background-color: #EEEEEE;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width:auto;
`;

const LoadingOrErrorComponent: React.FC = () => (
  <div>Loading or Error</div>
);

const Content = styled.div`
  margin-left:20px;
`;