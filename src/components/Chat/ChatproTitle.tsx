// ChatproTitle.tsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useChatStore } from "../../store/store";

const ChatproTitle: React.FC = () => {
  const { selectedRoomId, rooms,userId } = useChatStore();
  const [selectedUserProfile, setSelectedUserProfile] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {

      const selectedRoom = rooms.find(room => room.roomId === selectedRoomId);

      if (selectedRoom) {
        try {
          const userIdToFetch = selectedRoom.menteeId === userId
            ? selectedRoom.mentorId
            : selectedRoom.menteeId;

          const response = await axios.get(`http://52.79.37.100:32253/users/${userIdToFetch}`);
          setSelectedUserProfile(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [selectedRoomId, rooms, userId]);

  if (!selectedUserProfile) {
    console.log("error");
    return ;
  }

  return (
    <ChatproTitleWrapper>
      <div>Name: {selectedUserProfile.userDto.name}</div>
    </ChatproTitleWrapper>
  );
};

export default ChatproTitle;

const ChatproTitleWrapper = styled.div`
  text-align: center;
`;
