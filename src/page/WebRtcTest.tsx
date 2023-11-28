import { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const WebRTCExample = () => {
  const localStreamRef = useRef(null);
  const remoteStreamDivRef = useRef(null);
  const roomIdInputRef = useRef(null);
  const [roomId, setRoomId] = useState("1");
  const myKey = Math.random().toString(36).substring(2, 11);
  const pcListMapRef = useRef(new Map());
  const otherKeyListRef = useRef([]);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [stompClient, setStompClient] = useState<Stomp.Client>();

  const startCam = async () => {
    if (navigator.mediaDevices !== undefined) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        console.log("Stream found");
        setLocalStream(stream);
        stream.getAudioTracks()[0].enabled = true;
        localStreamRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    }
  };

  const connectSocket = async () => {
    console.log("connectSocket");
    const socket = new SockJS("http://localhost:8080/signaling");
    console.log("socket", socket);
    const stomp = Stomp.over(socket);
    stomp.debug = null;
    console.log("stomp", stomp);
    setStompClient(stomp);
    console.log("roomID", roomId);
    stomp.connect({}, () => {
      console.log("Connected to WebRTC server");

      stomp.subscribe(`/topic/peer/iceCandidate/${myKey}/${roomId}`, (candidate) => {
        const key = JSON.parse(candidate.body).key;
        const message = JSON.parse(candidate.body).body;
        pcListMapRef.current.get(key).addIceCandidate(
          new RTCIceCandidate({
            candidate: message.candidate,
            sdpMLineIndex: message.sdpMLineIndex,
            sdpMid: message.sdpMid,
          })
        );
      });
      console.log("myKey", myKey);
      console.log("roomId", roomId);
      stomp.subscribe(`/topic/peer/offer/${myKey}/${roomId}`, (offer) => {
        const key = JSON.parse(offer.body).key;
        const message = JSON.parse(offer.body).body;

        pcListMapRef.current.set(key, createPeerConnection(key));
        pcListMapRef.current.get(key).setRemoteDescription(new RTCSessionDescription({ type: message.type, sdp: message.sdp }));
        sendAnswer(pcListMapRef.current.get(key), key);
      });

      stomp.subscribe(`/topic/peer/answer/${myKey}/${roomId}`, (answer) => {
        const key = JSON.parse(answer.body).key;
        const message = JSON.parse(answer.body).body;

        pcListMapRef.current.get(key).setRemoteDescription(new RTCSessionDescription(message));
      });

      stomp.subscribe(`/topic/call/key`, (message) => {
        stomp.send(`/app/send/key`, {}, JSON.stringify(myKey));
      });

      stomp.subscribe(`/topic/send/key`, (message) => {
        const key = JSON.parse(message.body);

        if (myKey !== key && !otherKeyListRef.current.includes(key)) {
          otherKeyListRef.current.push(key);
          // otherKeyListRef.current = [...otherKeyListRef.current, key];
        }
      });
    });
  };

  let onTrack = (event, otherKey) => {
    if (document.getElementById(`${otherKey}`) === null) {
      const video = document.createElement("video");

      video.autoplay = true;
      video.controls = true;
      video.id = otherKey;
      video.srcObject = event.streams[0];

      document.getElementById("remoteStreamDiv").appendChild(video);
    }

    //
    // remoteStreamElement.srcObject = event.streams[0];
    // remoteStreamElement.play();
  };

  const createPeerConnection = (otherKey) => {
    const pc = new RTCPeerConnection();
    try {
      pc.addEventListener("icecandidate", (event) => {
        onIceCandidate(event, otherKey);
      });
      pc.addEventListener("track", (event) => {
        onTrack(event, otherKey);
      });
      if (localStream !== undefined) {
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

  const onIceCandidate = (event, otherKey) => {
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

  let sendOffer = (pc, otherKey) => {
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

  let sendAnswer = (pc, otherKey) => {
    pc.createAnswer().then((answer) => {
      setLocalAndSendMessage(pc, answer);
      stompClient.send(
        `/app/peer/answer/${otherKey}/${roomId}`,
        {},
        JSON.stringify({
          key: myKey,
          body: answer,
        })
      );
      console.log("Send answer");
    });
  };

  const setLocalAndSendMessage = (pc, sessionDescription) => {
    pc.setLocalDescription(sessionDescription);
  };
  const handleEnterRoom = async () => {
    await startCam();

    if (localStream !== null) {
      localStreamRef.current.style.display = "block";
      document.getElementById("startSteamBtn").style.display = "";
    }

    setRoomId("1");
    // roomIdInputRef.current?.setAttribute("disabled", "disabled");
    // document.getElementById("enterRoomBtn").setAttribute("disabled", "disabled");

    console.log(roomId);

    await connectSocket(); // WebSocket 연결
  };

  const handleStartStream = () => {
    console.log(stompClient);
    stompClient.send(`/app/call/key`, {}, {});
    console.log(otherKeyListRef);
    setTimeout(() => {
      otherKeyListRef.current.forEach((key) => {
        console.log(key);
        if (!pcListMapRef.current.has(key) && key != undefined) {
          pcListMapRef.current.set(key, createPeerConnection(key));
          sendOffer(pcListMapRef.current.get(key), key);
        }
      });
    }, 1000);
  };

  return (
    <div>
      <div>
        <input type="number" ref={roomIdInputRef} />
        <button type="button" onClick={handleEnterRoom}>
          enter Room
        </button>
        <button type="button" id="startSteamBtn" style={{ display: "none" }} onClick={handleStartStream}>
          start Streams
        </button>
      </div>

      <video id="localStream" ref={localStreamRef} autoPlay playsInline controls style={{ display: "none" }} />

      <div id="remoteStreamDiv" />
    </div>
  );
};

export default WebRTCExample;
