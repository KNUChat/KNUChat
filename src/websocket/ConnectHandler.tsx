// ConnectHandler.ts
import { Stomp } from "@stomp/stompjs";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

const ConnectHandler: React.FC = () => {
  const setClient = useChatStore((state) => state.setClient);

  useEffect(() => {
    const connectWebSocket = async () => {
      const client = Stomp.over(() => {
        const sock = new WebSocket("ws:52.79.37.100:31702/example");
        return sock;
      });

      const connectPromise = () => {
        return new Promise<void>((resolve, reject) => {
          client.connect(
            {},
            () => {
              console.log("Connected successfully!");
              setClient(client);
              resolve();
            },
            (error: any) => {
              console.error("Error connecting:", error);
              reject(error);
            }
          );
        });
      };

      try {
        await connectPromise();
      } catch (error) {
        // Handle connection error
        console.error("Connection error:", error);
      }

      return () => {
        client.disconnect();
      };
    };

    connectWebSocket();
  }, [setClient]);

  return null;
};

export default ConnectHandler;
