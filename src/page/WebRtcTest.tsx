import { useEffect, useRef, useState } from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import * as SimplePeer from "simple-peer";

const PeerConfig = () => {
  const localStreamElementRef = useRef(null);
  const remoteStreamDivRef = useRef(null);
  const roomIdInputRef = useRef(null);
  const enterRoomBtnRef = useRef(null);
  const startSteamBtnRef = useRef(null);

  const [myKey, setMyKey] = useState("");
  const [pcListMap, setPcListMap] = useState(new Map());
  const [roomId, setRoomId] = useState("");
  const [otherKeyList, setOtherKeyList] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const startCam = async () => {
      if (navigator.mediaDevices !== undefined) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          console.log("Stream found");
          setLocalStream(stream);
          stream.getAudioTracks()[0].enabled = true;
          localStreamElementRef.current.srcObject = stream;
        } catch (error) {
          console.error("Error accessing media devices:", error);
        }
      }
    };

    startCam();
  }, []);

  useEffect(() => {
    const connectSocket = async () => {
      const socket = new SockJS("/signaling");
      const stompClient = Stomp.over(socket);
      stompClient.debug = null;

      stompClient.connect({}, () => {
        console.log("Connected to WebRTC server");

        stompClient.subscribe(`/topic/peer/iceCandidate/${myKey}/${roomId}`, (candidate) => {
          const key = JSON.parse(candidate.body).key;
          const message = JSON.parse(candidate.body).body;

          pcListMap
            .get(key)
            .addIceCandidate(new RTCIceCandidate({ candidate: message.candidate, sdpMLineIndex: message.sdpMLineIndex, sdpMid: message.sdpMid }));
        });

        stompClient.subscribe(`/topic/peer/offer/${myKey}/${roomId}`, (offer) => {
          const key = JSON.parse(offer.body).key;
          const message = JSON.parse(offer.body).body;

          const pc = createPeerConnection(key);
          pc.setRemoteDescription(new RTCSessionDescription({ type: message.type, sdp: message.sdp }));
          sendAnswer(pc, key);
        });

        stompClient.subscribe(`/topic/peer/answer/${myKey}/${roomId}`, (answer) => {
          const key = JSON.parse(answer.body).key;
          const message = JSON.parse(answer.body).body;

          pcListMap.get(key).setRemoteDescription(new RTCSessionDescription(message));
        });

        stompClient.subscribe(`/topic/call/key`, (message) => {
          stompClient.send(`/app/send/key`, {}, JSON.stringify(myKey));
        });

        stompClient.subscribe(`/topic/send/key`, (message) => {
          const key = JSON.parse(message.body);

          if (myKey !== key && !otherKeyList.includes(myKey)) {
            setOtherKeyList((prevList) => [...prevList, key]);
          }
        });

        setStompClient(stompClient);
      });
    };

    if (localStream !== null && roomId !== "") {
      connectSocket();
    }
  }, [localStream, roomId]);

  const createPeerConnection = (otherKey) => {
    const pc = new SimplePeer();
    try {
      pc.on("icecandidate", (event) => {
        onIceCandidate(event, otherKey);
      });
      pc.on("track", (event) => {
        onTrack(event, otherKey);
      });
      if (localStream !== null) {
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
      stompClient.send(`/app/peer/iceCandidate/${otherKey}/${roomId}`, {}, JSON.stringify({ key: myKey, body: event.candidate }));
    }
  };

  const onTrack = (event, otherKey) => {
    if (!document.getElementById(`${otherKey}`)) {
      const video = document.createElement("video");
      video.autoplay = true;
      video.controls = true;
      video.id = otherKey;
      video.srcObject = event.streams[0];
      remoteStreamDivRef.current.appendChild(video);
    }
  };

  const sendOffer = (pc, otherKey) => {
    pc.createOffer().then((offer) => {
      setLocalAndSendMessage(pc, offer);
      stompClient.send(`/app/peer/offer/${otherKey}/${roomId}`, {}, JSON.stringify({ key: myKey, body: offer }));
      console.log("Send offer");
    });
  };

  const sendAnswer = (pc, otherKey) => {
    pc.createAnswer().then((answer) => {
      setLocalAndSendMessage(pc, answer);
      stompClient.send(`/app/peer/answer/${otherKey}/${roomId}`, {}, JSON.stringify({ key: myKey, body: answer }));
      console.log("Send answer");
    });
  };

  const setLocalAndSendMessage = (pc, sessionDescription) => {
    pc.setLocalDescription(sessionDescription);
  };

  const handleEnterRoomClick = () => {
    const roomId = roomIdInputRef.current.value;

    setRoomId(roomId);
    roomIdInputRef.current.disabled = true;
    enterRoomBtnRef.current.disabled = true;
    startSteamBtnRef.current.style.display = "";
  };

  const handleStartStreamClick = () => {
    stompClient.send(`/app/call/key`, {}, {});

    setTimeout(() => {
      otherKeyList.forEach((key) => {
        if (!pcListMap.has(key)) {
          const pc = createPeerConnection(key);
          setPcListMap((prevMap) => new Map(prevMap).set(key, pc));
          sendOffer(pc, key);
        }
      });
    }, 1000);
  };

  return (
    <div>
      <input type="number" ref={roomIdInputRef} />
      <button type="button" onClick={handleEnterRoomClick} ref={enterRoomBtnRef}>
        enter Room
      </button>
      <button type="button" onClick={handleStartStreamClick} style={{ display: "none" }} ref={startSteamBtnRef}>
        start Streams
      </button>

      <video id="localStream" autoPlay playsInline controls style={{ display: "none" }} ref={localStreamElementRef} />

      <div id="remoteStreamDiv" ref={remoteStreamDivRef}></div>
    </div>
  );
};

export default PeerConfig;
