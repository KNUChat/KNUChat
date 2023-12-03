// SubHandler.tsx
import { useEffect } from "react";
import { useChatStore } from "@/store/store";

const SubHandler: React.FC= () => {
  const {client, selectedRoomId} = useChatStore();

  useEffect(() => {
    if (client && selectedRoomId) {
      const subscribeAddress = `/sub/room/${selectedRoomId}`;
      const subscription = client.subscribe(
        subscribeAddress,
        (message) => {
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