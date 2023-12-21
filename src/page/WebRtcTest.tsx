import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const WebRTCChat = () => {
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const localStreamRef = useRef<HTMLVideoElement>(null);
  const remoteStreamDivRef = useRef<HTMLDivElement>(null);
  const [roomId, setRoomId] = useState("");
  const [localStream, setLocalStream] = useState<MediaStream | undefined>(undefined);
  const [pcListMap, setPcListMap] = useState<Map<string, RTCPeerConnection>>(new Map());
  const [otherKeyList, setOtherKeyList] = useState<string[]>([]);
  const myKey = useRef(Math.random().toString(36).substring(2, 11));

  useEffect(() => {
    const startCam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        console.log("Stream found");
        setLocalStream(stream);
        if (localStreamRef.current) localStreamRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    startCam();
  }, []);

  const handleOfferReceived = (offer: RTCSessionDescriptionInit, otherKey: string) => {
    const pc = createPeerConnection(otherKey);

    if (pc && pc.signalingState === "stable" && offer && offer.type) {
      pc.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => {
          return pc.createAnswer();
        })
        .then((answer) => {
          return pc.setLocalDescription(answer);
        })
        .then(() => {
          if (pc.localDescription && stompClient) {
            stompClient.send(`/app/peer/answer/${otherKey}/${roomId}`, {}, JSON.stringify({ key: myKey.current, body: pc.localDescription }));
          }
        })
        .catch((error) => {
          console.error("Error handling received offer:", error);
        });
    } else {
      console.error("Invalid or null offer received, or signaling state is not stable.");
    }
  };
  useEffect(() => {
    const connectSocket = async () => {
      const socket = new SockJS("http://52.79.37.100:32408/signaling");
      const client = Stomp.over(socket);
      client.debug = null;

      client.connect({}, () => {
        console.log("Connected to WebRTC server");
        setStompClient(client);

        client.subscribe(`/topic/call/key`, () => {
          client.send(`/app/send/key`, {}, JSON.stringify(myKey.current));
        });

        client.subscribe(`/topic/send/key`, (message) => {
          const key = JSON.parse(message.body);

          if (myKey.current !== key && !otherKeyList.includes(key)) {
            setOtherKeyList((prevList) => [...prevList, key]);
          }
        });

        client.subscribe(`/topic/peer/iceCandidate/${myKey.current}/${roomId}`, (candidate) => {
          const key = JSON.parse(candidate.body).key;
          const message = JSON.parse(candidate.body).body;
          handleOfferReceived(message, key);

          pcListMap.get(key)?.addIceCandidate(
            new RTCIceCandidate({
              candidate: message.candidate,
              sdpMLineIndex: message.sdpMLineIndex,
              sdpMid: message.sdpMid,
            })
          );
        });

        client.subscribe(`/topic/peer/offer/${myKey.current}/${roomId}`, (offer) => {
          const key = JSON.parse(offer.body).key;
          const message = JSON.parse(offer.body).body;

          const pc = createPeerConnection(key);
          pcListMap.set(key, pc);
          pc.setRemoteDescription(new RTCSessionDescription({ type: message.type, sdp: message.sdp }));
          sendAnswer(pc, key);
        });

        client.subscribe(`/topic/peer/answer/${myKey.current}/${roomId}`, (answer) => {
          const key = JSON.parse(answer.body).key;
          const message = JSON.parse(answer.body).body;

          pcListMap.get(key)?.setRemoteDescription(new RTCSessionDescription(message));
        });
      });
    };

    connectSocket();
  }, [roomId]);

  const [isSocketConnected, setIsSocketConnected] = useState(false); // 소켓 연결 상태를 나타내는 상태 추가

  useEffect(() => {
    if (stompClient) {
      setIsSocketConnected(stompClient.connected); // 소켓 연결 여부 업데이트
    }
  }, [stompClient]);

  const createPeerConnection = (otherKey: string) => {
    const pc = new RTCPeerConnection();

    pc.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        stompClient.send(
          `/app/peer/iceCandidate/${otherKey}/${roomId}`,
          {},
          JSON.stringify({
            key: myKey.current,
            body: {
              candidate: event.candidate.candidate,
              sdpMLineIndex: event.candidate.sdpMLineIndex,
              sdpMid: event.candidate.sdpMid,
            },
          })
        );
      }
    });

    pc.addEventListener("track", (event) => {
      if (remoteStreamDivRef.current && event.streams[0]) {
        const video = document.createElement("video");
        video.autoplay = true;
        video.controls = true;
        video.id = otherKey;
        video.srcObject = event.streams[0];
        remoteStreamDivRef.current.appendChild(video);
      }
    });

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    return pc;
  };
  const handleEnterRoom = async () => {
    console.log(localStream, roomId);
    if (localStream && roomId) {
      // Disable input and button after entering the room
      document.querySelector<HTMLInputElement>("#roomIdInput")?.setAttribute("disabled", "true");
      document.querySelector<HTMLButtonElement>("#enterRoomBtn")?.setAttribute("disabled", "true");
    }
  };

  const sendOffer = (pc: RTCPeerConnection, otherKey: string) => {
    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .then(() => {
        if (pc.localDescription && stompClient) {
          stompClient.send(`/app/peer/offer/${otherKey}/${roomId}`, {}, JSON.stringify({ key: myKey.current, body: pc.localDescription }));
        }
      })
      .catch((error) => {
        console.error("Error creating and sending offer:", error);
      });
  };

  const sendAnswer = (pc: RTCPeerConnection, otherKey: string) => {
    pc.createAnswer()
      .then((answer) => pc.setLocalDescription(answer))
      .then(() => {
        if (pc.localDescription && stompClient) {
          stompClient.send(`/app/peer/answer/${otherKey}/${roomId}`, {}, JSON.stringify({ key: myKey.current, body: pc.localDescription }));
        }
      })
      .catch((error) => {
        console.error("Error creating and sending answer:", error);
      });
  };
  const handleStartStream = async () => {
    console.log("localStream", localStream, "roomId", roomId, "remoteStreamRef", remoteStreamDivRef);
    if (!localStream || !roomId) return;

    // Send the key to initiate the call
    await stompClient.send(`/app/call/key`, {}, {});

    setTimeout(() => {
      otherKeyList.forEach((key) => {
        if (!pcListMap.has(key)) {
          const pc = createPeerConnection(key);
          pcListMap.set(key, pc);
          sendOffer(pc, key);
        }
      });
    }, 1000);
  };

  const [connectedUsers, setConnectedUsers] = useState<number>(0); // 연결된 사용자 수를 추적하는 상태 추가

  useEffect(() => {
    // PC 연결 상태 확인을 위한 함수
    const checkPeerConnectionStatus = () => {
      pcListMap.forEach((pc) => {
        if (pc.connectionState === "connected") {
          console.log("Peer connection established:", pc); // 연결된 피어 커넥션 로그 확인
        }
      });
    };

    // 초기 연결 상태 확인
    checkPeerConnectionStatus();

    // 연결된 사용자 수 추적을 위한 훅
    const trackConnectedUsers = () => {
      setConnectedUsers(pcListMap.size); // 연결된 사용자 수 업데이트
    };

    // 사용자 수 업데이트
    trackConnectedUsers();

    // PC 연결 상태 변화를 추적하기 위한 이벤트 핸들러 추가
    pcListMap.forEach((pc) => {
      pc.addEventListener("connectionstatechange", () => {
        checkPeerConnectionStatus(); // 피어 커넥션 상태 변경 로그 확인
        trackConnectedUsers(); // 연결된 사용자 수 업데이트
      });
    });
  }, [pcListMap]);

  return (
    <div>
      <div>
        <input type="text" id="roomIdInput" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        <button onClick={handleEnterRoom}>Enter Room</button>
        <button onClick={handleStartStream}>Start Stream</button>
        <p>Socket Connected: {isSocketConnected ? "Yes" : "No"}</p>
        <p>Connected Users: {connectedUsers}</p>
      </div>
      <div>
        <video ref={localStreamRef} autoPlay muted controls style={{ display: localStream ? "block" : "none" }} />
        <div ref={remoteStreamDivRef} id="remoteStreamDiv"></div>
      </div>
    </div>
  );
};

export default WebRTCChat;
