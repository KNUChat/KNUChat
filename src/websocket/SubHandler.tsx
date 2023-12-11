// SubHandler.tsx
import { useEffect } from "react";
import { useChatStore } from "@store/useChatStore";

const SubHandler: React.FC= () => {
  const {client, selectedRoomId,addMessage,rooms} = useChatStore();

  const selectedRoom = rooms.find((room) => room.roomId === selectedRoomId);

  useEffect(() => {
    if (client && selectedRoomId&&selectedRoom?.roomStatus==="CHAT_PROCEEDING") {
      const subscribeAddress = `/sub/room/${selectedRoomId}`;
      const subscription = client.subscribe(
        subscribeAddress,
        (message) => {
          addMessage(JSON.parse(message.body));
          console.log("Received message:", JSON.parse(message.body));
        },
        {}
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [client, selectedRoomId]);
  return null;
};

export default SubHandler;