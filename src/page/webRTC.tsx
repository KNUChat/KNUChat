import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const YourComponent: React.FC = () => {
  const localStreamElement = useRef<HTMLVideoElement>(null);
  const [myKey, setMyKey] = useState<string>(Math.random().toString(36).substring(2, 11));
  const [pcListMap, setPcListMap] = useState<Map<string, RTCPeerConnection>>(new Map());
  const [roomId, setRoomId] = useState<string>("");
  const [otherKeyList, setOtherKeyList] = useState<string[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | undefined>();
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  let stompClient: Stomp.Client;
  const startCam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      console.log("Stream found");
      setLocalStream(stream);
      if (localStreamElement.current) {
        localStreamElement.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const connectSocket = async () => {
    const socket = new SockJS("http://52.79.37.100:32408/signaling");
    const stompClient = Stomp.over(socket);
    stompClient.debug = null;

    stompClient.connect({}, () => {
      console.log("Connected to WebRTC server");

      stompClient.subscribe(`/topic/peer/iceCandidate/${myKey}/${roomId}`, (candidate) => {
        const key = JSON.parse(candidate.body).key;
        const message = JSON.parse(candidate.body).body;

        pcListMap.get(key).addIceCandidate(
          new RTCIceCandidate({
            candidate: message.candidate,
            sdpMLineIndex: message.sdpMLineIndex,
            sdpMid: message.sdpMid,
          })
        );
      });

      // ... (다른 구독 로직)

      stompClient.send(`/app/send/key`, {}, JSON.stringify(myKey));
    });
  };

  const createPeerConnection = (otherKey: string) => {
    const pc = new RTCPeerConnection();
    try {
      pc.addEventListener("icecandidate", (event) => {
        onIceCandidate(event, otherKey);
      });
      pc.addEventListener("track", (event) => {
        onTrack(event, otherKey);
      });
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
      }

      console.log("PeerConnection created");
    } catch (error) {
      console.error("PeerConnection failed: ", error);
    }
    return pc;
  };

  const onIceCandidate = (event: RTCPeerConnectionIceEvent, otherKey: string) => {
    if (event.candidate) {
      console.log("ICE candidate");
      stompClient.send(
        `/app/peer/iceCandidate/${otherKey}/${roomId}`,
        {},
        JSON.stringify({
          key: myKey,
          body: event.candidate,
        })
      );
    }
  };

  const onTrack = (event: RTCTrackEvent, otherKey: string) => {
    if (document.getElementById(`${otherKey}`) === null) {
      const video = document.createElement("video");

      video.autoplay = true;
      video.controls = true;
      video.id = otherKey;
      video.srcObject = event.streams[0];

      document.getElementById("remoteStreamDiv")?.appendChild(video);
    }
  };

  useEffect(() => {
    if (roomId && localStream) {
      document.getElementById("roomIdInput")?.setAttribute("disabled", "true");
      document.getElementById("enterRoomBtn")?.setAttribute("disabled", "true");
      connectSocket();
    }
  }, [roomId, localStream]);

  const enterRoom = async () => {
    await startCam();
    setRoomId(document.querySelector("#roomIdInput")?.value || "");
  };

  const sendOffer = (pc, otherKey) => {
    pc.createOffer().then((offer) => {
      setLocalAndSendMessage(pc, offer);
      stompClient.send(
        `/app/peer/offer/${otherKey}/${roomId}`,
        {},
        JSON.stringify({
          key: myKey,
          body: offer,
        })
      );
      console.log("Send offer");
    });
  };
  const startStreams = async () => {
    await stompClient.send(`/app/call/key`, {}, {});
    setTimeout(() => {
      otherKeyList.forEach((key) => {
        if (!pcListMap.has(key)) {
          const newPc = createPeerConnection(key);
          pcListMap.set(key, newPc);
          sendOffer(newPc, key);
        }
      });
    }, 1000);
  };

  return (
    <div>
      <input type="number" value={roomId} onChange={(e) => setRoomId(e.target.value)} id="roomIdInput" />
      <button type="button" onClick={enterRoom} id="enterRoomBtn">
        enter Room
      </button>
      <button type="button" onClick={startStreams} id="startSteamBtn" style={{ display: localStream ? "block" : "none" }}>
        start Streams
      </button>

      <video ref={localStreamElement} id="localStream" autoPlay playsInline controls style={{ display: localStream ? "block" : "none" }}></video>

      <div id="remoteStreamDiv">
        {remoteStreams.map((stream, index) => (
          <video key={index} autoPlay playsInline controls>
            <source srcObject={stream} />
            {/* 아래와 같이 `<source>` 태그에 `srcObject` 속성을 사용합니다. */}
          </video>
        ))}
      </div>
    </div>
  );
};

export default YourComponent;
