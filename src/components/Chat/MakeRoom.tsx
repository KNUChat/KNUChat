import React, { useState } from "react";
import styled from "styled-components";
import { useChatStore } from "@store/useChatStore";
import { useAuthStore } from "@store/useAuthStore";
import axios from "axios"; // axios를 추가합니다.

const MakeRoom: React.FC = () => {
  const [mentorId, setMentorId] = useState<number | string>("");
  const [msg, setMsg] = useState<string>("");
  const { setUpdate, userId } = useChatStore();
  const { authToken } = useAuthStore();

  const handleCreateRoom = async () => {
    try {
      const mentorIdInt =
        typeof mentorId === "number" ? mentorId : parseInt(mentorId);

      if (isNaN(mentorIdInt)) {
        console.error("Invalid menteeId or mentorId");
        return;
      }

      const response = await axios.post('http://52.79.37.100:30952/chat/room',
        {
          menteeId: userId,
          mentorId: mentorIdInt,
          message: msg,
        },
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
        console.log(response.data);
      if (response.status === 200) {
        console.log("Chat room created successfully!");
        setUpdate(true);
      } else {
        console.error("Failed to create chat room");
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  return (
    <MakeRoomWrapper>
      <div>Mentor ID</div>
      <label>
        <input
          type="text"
          value={mentorId}
          onChange={(e) => setMentorId(e.target.value)}
        />
      </label>
      <div>Message : </div>
      <label>
        <input
          placeholder="First Message"
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </label>
      <button onClick={handleCreateRoom}>Start Chat</button>
    </MakeRoomWrapper>
  );
};

export default MakeRoom;

const MakeRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
