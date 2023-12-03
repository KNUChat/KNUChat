// ConnectHandler.ts
import { Stomp } from "@stomp/stompjs";
import { useEffect } from "react";
import { useChatStore } from "../store/store"; // Update the import statement

const ConnectHandler: React.FC = () => {
  const setClient = useChatStore((state) => state.setClient); // Use the hook to get the setClient function

  useEffect(() => {
    const client = Stomp.over(() => {
      const sock = new WebSocket("ws:52.79.37.100:31702/example");
      return sock;
    });

    client.connect(
      {},
      () => {
        console.log("Connected successfully!");
        setClient(client); // Set the client in the store
      }
    );

    return () => {
      client.disconnect();
    };
  }, [setClient]);

  return null;
};

export default ConnectHandler;
