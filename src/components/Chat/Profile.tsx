import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "@store/useAuthStore";

const Profile: React.FC = () => {
  const { selectedRoomId, rooms, userId} = useChatStore();
  const {authToken} = useAuthStore()
  const [selectedUserProfile, setSelectedUserProfile] = useState<any | null>(null);
  const [content, setContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {

      const selectedRoom = rooms.find(room => room.roomId === selectedRoomId);

      if (selectedRoom) {
        try {
          const userIdToFetch = selectedRoom.menteeId === userId
            ? selectedRoom.mentorId
            : selectedRoom.menteeId;

          const response = await axios.get(`http://52.79.37.100:32100/users/${userIdToFetch}`,{
            headers: {
              Authorization: `${authToken}`,
            },
          });
          setSelectedUserProfile(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [selectedRoomId, rooms, userId]);

  useEffect(() => {
    if (selectedRoomId) {
      setContent(
        <ContentWrapper>
          <Content>
            {selectedUserProfile?.userDto.name}
            ({selectedUserProfile?.profileDto.stdNum})
            </Content>
          <Content>{selectedUserProfile?.userDto.email}</Content>
          <Content>{selectedUserProfile?.departmentDtos[0].college}</Content>
          <Content>{selectedUserProfile?.departmentDtos[0].department}</Content>
          <Content>{selectedUserProfile?.departmentDtos[0].major}</Content>
        </ContentWrapper>
      );
    } else {
      setContent(null);
    }
  }, [selectedRoomId, selectedUserProfile]);

  if (!selectedUserProfile) {
    return <LoadingOrErrorComponent />;
  }
  return (
    <ProfileWrapper>
      {content}
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  text-align: left;
  border-radius:10px 10px 10px 10px;
  background-color: white;
  padding-bottom: 10px;
`;

const LoadingOrErrorComponent: React.FC = () => (
  <div>Loading or Error</div>
);

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding-top: 0.5rem;
  margin-left: 1rem;
`;