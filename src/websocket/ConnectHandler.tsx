// ConnectHandler.ts
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, Dispatch, SetStateAction } from "react";

interface ConnectHandlerProps {
  setClient: Dispatch<SetStateAction<CompatClient | null>>;
}

const ConnectHandler: React.FC<ConnectHandlerProps> = ({ setClient }) => {
  useEffect(() => {
    const client = Stomp.over(() => {
      const sock = new WebSocket("ws://localhost:8080/example");
      return sock;
    });

    client.connect(
      {},
      () => {
        setClient(client);

        client.subscribe(
          `/sub/room/1`,
          (message) => {
            console.log("Received message:", JSON.parse(message.body));
          },
          {}
        );
      }
    );

    return () => {
      client.disconnect();
    };
  }, [setClient]);

  return null;
};

export default ConnectHandler;
