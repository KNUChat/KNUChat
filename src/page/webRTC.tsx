// WebRTC.tsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

type Props = {
  id?: string;
  uuid?: string;
};

const WebRTC = ({ uuid }: Props) => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/signal`);

    const peerConnectionConfig = {
      iceServers: [{ urls: "stun:stun.stunprotocol.org:3478" }, { urls: "stun:stun.l.google.com:19302" }],
    };

    const mediaConstraints = {
      audio: true,
      video: true,
    };

    let localStream: MediaStream;
    let localVideoTracks: MediaStreamTrack[];
    let myPeerConnection: RTCPeerConnection;

    function log(message: string) {
      console.log(message);
    }

    function handleErrorMessage(message: string) {
      console.error(message);
    }

    function sendToServer(msg: any) {
      let msgJSON = JSON.stringify(msg);
      socket.send(msgJSON);
    }

    function getMedia(constraints: MediaStreamConstraints) {
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      navigator.mediaDevices.getUserMedia(constraints).then(getLocalMediaStream).catch(handleGetUserMediaError);
    }

    function handlePeerConnection(message: any) {
      createPeerConnection();
      getMedia(mediaConstraints);
      if (message.data === "true") {
        myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
      }
    }

    function createPeerConnection() {
      myPeerConnection = new RTCPeerConnection(peerConnectionConfig);

      myPeerConnection.onicecandidate = handleICECandidateEvent;
      myPeerConnection.ontrack = handleTrackEvent;
    }

    function getLocalMediaStream(mediaStream: MediaStream) {
      localStream = mediaStream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
      localStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, localStream));
    }

    function handleGetUserMediaError(error: any) {
      log("navigator.getUserMedia error: ", error);
      switch (error.name) {
        case "NotFoundError":
          alert("Unable to open your call because no camera and/or microphone were found.");
          break;
        case "SecurityError":
        case "PermissionDeniedError":
          break;
        default:
          alert("Error opening your camera and/or microphone: " + error.message);
          break;
      }
    }

    function handleICECandidateEvent(event: any) {
      if (event.candidate) {
        sendToServer({
          from: uuid,
          type: "ice",
          candidate: event.candidate,
        });
        log("ICE Candidate Event: ICE candidate sent");
      }
    }

    function handleTrackEvent(event: any) {
      log("Track Event: set stream to remote video element");
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    }

    function handleNegotiationNeededEvent() {
      myPeerConnection
        .createOffer()
        .then(function (offer) {
          return myPeerConnection.setLocalDescription(offer);
        })
        .then(function () {
          sendToServer({
            from: uuid,
            type: "offer",
            sdp: myPeerConnection.localDescription,
          });
          log("Negotiation Needed Event: SDP offer sent");
        })
        .catch(function (reason) {
          handleErrorMessage("failure to connect error: ", reason);
        });
    }

    function handleOfferMessage(message: any) {
      log("Accepting Offer Message");
      log(message);
      let desc = new RTCSessionDescription(message.sdp);
      if (desc != null && message.sdp != null) {
        log("RTC Signalling state: " + myPeerConnection.signalingState);
        myPeerConnection
          .setRemoteDescription(desc)
          .then(function () {
            log("Set up local media stream");
            return navigator.mediaDevices.getUserMedia(mediaConstraints);
          })
          .then(function (stream) {
            log("-- Local video stream obtained");
            localStream = stream;
            try {
              if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream;
              }
            } catch (error) {
              if (localVideoRef.current) {
                localVideoRef.current.src = window.URL.createObjectURL(stream);
              }
            }

            log("-- Adding stream to the RTCPeerConnection");
            localStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, localStream));
          })
          .then(function () {
            log("-- Creating answer");
            return myPeerConnection.createAnswer();
          })
          .then(function (answer) {
            log("-- Setting local description after creating answer");
            return myPeerConnection.setLocalDescription(answer);
          })
          .then(function () {
            log("Sending answer packet back to other peer");
            sendToServer({
              from: uuid,
              type: "answer",
              sdp: myPeerConnection.localDescription,
            });
          })
          .catch(handleErrorMessage);
      }
    }

    function handleAnswerMessage(message: any) {
      log("The peer has accepted request");

      myPeerConnection.setRemoteDescription(message.sdp).catch(handleErrorMessage);
    }

    function handleNewICECandidateMessage(message: any) {
      let candidate = new RTCIceCandidate(message.candidate);
      log("Adding received ICE candidate: " + JSON.stringify(candidate));
      myPeerConnection.addIceCandidate(candidate).catch(handleErrorMessage);
    }

    socket.onmessage = function (msg) {
      let message = JSON.parse(msg.data);
      switch (message.type) {
        case "text":
          log("Text message from " + message.from + " received: " + message.data);
          break;

        case "offer":
          log("Signal OFFER received");
          handleOfferMessage(message);
          break;

        case "answer":
          log("Signal ANSWER received");
          handleAnswerMessage(message);
          break;

        case "ice":
          log("Signal ICE Candidate received");
          handleNewICECandidateMessage(message);
          break;

        case "join":
          log("Client is starting to " + (message.data === "true") ? "negotiate" : "wait for a peer");
          handlePeerConnection(message);
          break;

        default:
          handleErrorMessage("Wrong type message received from server");
      }
    };

    socket.onopen = function () {
      log("WebSocket connection opened to Room: #" + id);
      sendToServer({
        from: uuid,
        type: "join",
        data: id,
      });
    };

    socket.onclose = function (message) {
      log("Socket has been closed");
    };

    socket.onerror = function (message) {
      handleErrorMessage("Error: " + message);
    };
  }, [id, uuid]);

  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
};

export default WebRTC;
