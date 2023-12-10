import { useEffect, useRef } from "react";

const VideoChat = () => {
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  let localStream: MediaStream;
  let myPeerConnection: RTCPeerConnection;
  let localVideoTracks: MediaStreamTrack[];

  const peerConnectionConfig = {
    iceServers: [{ urls: "stun:stun.stunprotocol.org:3478" }, { urls: "stun:stun.l.google.com:19302" }],
  };

  const mediaConstraints = {
    audio: true,
    video: true,
  };

  const localUserName = localStorage.getItem("uuid");

  useEffect(() => {
    start();
  }, []);

  const start = () => {
    createPeerConnection();
    getMedia(mediaConstraints);
  };

  const stop = () => {
    // TODO: Send a message to the server
    console.log("Socket closed");
  };

  const getMedia = (constraints: MediaStreamConstraints) => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    navigator.mediaDevices.getUserMedia(constraints).then(getLocalMediaStream).catch(handleGetUserMediaError);
  };

  const handleGetUserMediaError = (error: any) => {
    console.log("navigator.getUserMedia error: ", error);
    // TODO: Handle errors
    stop();
  };

  const getLocalMediaStream = (mediaStream: MediaStream) => {
    localStream = mediaStream;
    if (localVideo.current) {
      localVideo.current.srcObject = mediaStream;
    }
    localStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, localStream));
  };

  const createPeerConnection = () => {
    myPeerConnection = new RTCPeerConnection(peerConnectionConfig);
    myPeerConnection.onicecandidate = handleICECandidateEvent;
    myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  };

  const handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      // TODO: Send to server
      console.log("handleICECandidateEvent: ICE candidate sent");
    }
  };

  const handleNegotiationNeededEvent = () => {
    myPeerConnection
      .createOffer()
      .then(function (offer) {
        return myPeerConnection.setLocalDescription(offer);
      })
      .then(function () {
        // TODO: Send to server
        console.log("handleNegotiationNeededEvent: SDP offer sent");
      })
      .catch(function (reason) {
        console.log("failure to connect error: ", reason);
      });
  };

  return (
    <div>
      <video ref={localVideo} autoPlay />
      <video ref={remoteVideo} autoPlay />
      <button onClick={start}>시작</button>
      <button onClick={stop}>종료</button>
    </div>
  );
};

export default VideoChat;
