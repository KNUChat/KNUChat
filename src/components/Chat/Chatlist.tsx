import ChatroomBox from "./ChatroomBox";
import { useEffect, useState } from "react";

interface Room {
  roomId: number;
  mentorName: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const Chatlist = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // TODO: 서버에서 방 정보를 가져와서 상태 업데이트
    const dummyRooms = [
      {
        roomId: 123,
        mentorName: "LeeSangHee",
        status: "progress",
        created_at: "2023-10-14T01:33:51Z",
        updated_at: "2023-10-14T01:34:00Z",
      },
      // ... 더 많은 방 정보
    ];

    setRooms(dummyRooms);
  }, []);

  return (
    <div>
      {rooms.map((room) => (
        <ChatroomBox key={room.roomId} room={room} />
      ))}
    </div>
  );
};

export default Chatlist;
