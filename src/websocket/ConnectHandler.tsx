import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useRef, useEffect } from "react";

const ConnectHandler = () => {
  const client = useRef<CompatClient | null>(null);

  const setMessage = (data: any) => {
    console.log("Received message:", data);

  };

  useEffect(() => {
    const connectHandler = () => {
      client.current = Stomp.over(() => {
        const sock = new SockJS("ws://localhost:8080/example");
        return sock;
      });

      client.current?.connect(
        {
          // 여기에서 유효성 검증을 위한 header
        },
        () => {
          // callback 함수 설정, 대부분 여기에 sub 함수 씀
          client.current?.subscribe(
            `/sub/room/{roomid}`,
            (message) => {
              setMessage(JSON.parse(message.body));
            },
            {
              // 여기에도 유효성 검증을 위한 header
            }
          );
        }
      );
    };

    connectHandler();

    return () => {
      // 컴포넌트가 언마운트될 때 WebSocket 연결을 해제합니다.
      client.current?.disconnect();
    };
  }, []); // useEffect는 한 번만 실행되어야 하므로 빈 배열을 전달합니다.

  return null;
};

export default ConnectHandler;
