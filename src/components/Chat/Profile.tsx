// profile.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useChatStore } from "../../store/store";

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
          console.log(userIdToFetch);
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
      <div>Name: {selectedUserProfile.userDto.name}</div>
      <div>Email: {selectedUserProfile.userDto.email}</div>
      <div>Collage: {selectedUserProfile.departmentDtos.Collage}</div>
      <div>Department: {selectedUserProfile.departmentDtos.department}</div>
      <div>Mayjor: {selectedUserProfile.departmentDtos.major}</div>
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  text-align: center;
`;

const LoadingOrErrorComponent: React.FC = () => (
  <div>Loading or Error</div>
);
