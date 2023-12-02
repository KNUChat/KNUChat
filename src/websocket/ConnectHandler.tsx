// ConnectHandler.ts
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useEffect, Dispatch, SetStateAction } from "react";

interface ConnectHandlerProps {
  setClient: Dispatch<SetStateAction<CompatClient | null>>;
}

const ConnectHandler: React.FC<ConnectHandlerProps> = ({ setClient }) => {
  useEffect(() => {
    const client = Stomp.over(() => {
      const sock = new WebSocket("ws:52.79.37.100:31702/example");
      return sock;
    });

    client.connect(
      {},
      () => {
        setClient(client);
      }
    );

    return () => {
      client.disconnect();
    };
  }, [setClient]);

  return null;
};

export default ConnectHandler;