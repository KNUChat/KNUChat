import React, { useState } from "react";
import styled from "styled-components";
import { useChatStore } from "@store/useChatStore";

const MakeRoom: React.FC = () => {
  const [menteeId, setMenteeId] = useState<number | string>("");
  const [mentorId, setMentorId] = useState<number | string>("");
  const [msg, setMsg] = useState<string>("");
  const {update,setUpdate} = useChatStore();

  const handleCreateRoom = async () => {
    try {
      const menteeIdInt = typeof menteeId === "number" ? menteeId : parseInt(menteeId);
      const mentorIdInt = typeof mentorId === "number" ? mentorId : parseInt(mentorId);

      if (isNaN(menteeIdInt) || isNaN(mentorIdInt)) {
        console.error("Invalid menteeId or mentorId");
        return;
      }

      const response = await fetch("http://52.79.37.100:32253/chat/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          menteeId: menteeIdInt,
          mentorId: mentorIdInt,
          msg: msg,
        }),
      });

      if (response.ok) {
        console.log("Chat room created successfully!");
        setUpdate(true);
        console.log(update);
      } else {
        console.error("Failed to create chat room");
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  return (
    <MakeRoomWrapper>
      <div>Mentee ID</div>
      <label>
        <input
          type="text"
          value={menteeId}
          onChange={(e) => setMenteeId(e.target.value)}
        />
      </label>
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
  display : flex,
  flex-direction : row,
`;
