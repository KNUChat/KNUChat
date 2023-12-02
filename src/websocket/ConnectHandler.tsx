// ConnectHandler.ts
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useEffect, Dispatch, SetStateAction } from "react";
import { useChatStore } from "../store/store";

interface ConnectHandlerProps {
  setClient: Dispatch<SetStateAction<CompatClient | null>>;
}

const ConnectHandler: React.FC<ConnectHandlerProps> = ({ setClient }) => {
  const { selectedRoomId } = useChatStore();

  useEffect(() => {
    const client = Stomp.over(() => {
      const sock = new WebSocket("ws:52.79.37.100:31702/example");
      return sock;
    });

    client.connect(
      {},
      () => {
        setClient(client);

        if (selectedRoomId) {
          const subscribeAddress = `/sub/room/${selectedRoomId}`;
          client.subscribe(
            subscribeAddress,
            (message) => {
              console.log("Received message:", JSON.parse(message.body));
            },
            {}
          );
        }
      }
    );

    return () => {
      client.disconnect();
    };
  }, [setClient, selectedRoomId]);

  return null;
};

export default ConnectHandler;
