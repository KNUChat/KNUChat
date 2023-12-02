// SubHandler.tsx
import { CompatClient } from "@stomp/stompjs";
import { useEffect } from "react";

interface SubHandlerProps {
  client: CompatClient | null;
  selectedRoomId: number | null;
}

const SubHandler: React.FC<SubHandlerProps> = ({ client, selectedRoomId }) => {
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