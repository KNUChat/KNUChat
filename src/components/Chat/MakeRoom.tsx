import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useChatStore } from "@store/useChatStore";
import { useAuthStore } from "@store/useAuthStore";
import axios from "axios"; // axios를 추가합니다.
import { useUserStore } from "@store/useUserStore";
import { useMentorStore } from "@store/useMentorStore";
import DefaultInput from "@components/Common/DefaultInput";

const MakeRoom: React.FC = () => {
  const { mentorId: Id } = useMentorStore();
  const [mentorId, setMentorId] = useState<number | string>(Id);
  const [msg, setMsg] = useState<string>("");
  const { setUpdate } = useChatStore();
  const { authToken } = useAuthStore();
  const { userInfo } = useUserStore();
  const userId = Number(userInfo.id);
  console.log("authToken", authToken);
  console.log("userId", userId);

  const defaultInputRef = useRef(null);
  const handleCreateRoom = async () => {
    try {
      const mentorIdInt = typeof mentorId === "number" ? mentorId : parseInt(mentorId);
      console.log("mentorIdInt", mentorIdInt);
      if (isNaN(mentorIdInt)) {
        console.error("Invalid menteeId or mentorId");
        return;
      }

      const response = await axios.post(
        "http://52.79.37.100:30952/chat/room",
        {
          menteeId: userId,
          mentorId: mentorIdInt,
          message: msg,
        },
        {
          headers: {
            Authorization: `${authToken}`,
          },
          withCredentials: false,
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
      <h1>Mentor ID</h1>
      <label>
        <IdText>신청하려는 멘토님의 ID는 "{mentorId}"입니다.</IdText>
      </label>
      <h2>남기실 첫 번째 메세지를 작성해주세요! </h2>
      <label>
        <InputBox placeholder="First Message" type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
        {/* <DefaultInput ref={defaultInputRef} maxLength={200} /> */}
      </label>
      <BlackButton onClick={handleCreateRoom}>채팅 시작하기</BlackButton>
    </MakeRoomWrapper>
  );
};

export default MakeRoom;

const MakeRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const IdText = styled.h3`
  margin: 0;
`;

const BlackButton = styled.button`
  flex: 8;
  max-width: 7rem;
  max-height: 2rem;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #333;
  font-size: 16px;
  background-color: #fff;
  outline: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #222;
    color: #fff;
  }
`;

const InputBox = styled.input`
  width: 90%;
  margin-bottom: 0.5rem;
  min-height: 2rem;
`;
