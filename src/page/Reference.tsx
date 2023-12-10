import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const VideoCall = () => {
  const socketRef = useRef<Socket>();
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>();

  const { roomName } = useParams();

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      if (!(pcRef.current && socketRef.current)) {
        return;
      }
      stream.getTracks().forEach((track) => {
        if (!pcRef.current) {
          return;
        }
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socketRef.current) {
            return;
          }
          console.log("recv candidate");
          socketRef.current.emit("candidate", e.candidate, roomName);
        }
      };

      pcRef.current.ontrack = (e) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    console.log("create Offer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }
    try {
      const sdp = await pcRef.current.createOffer();
      pcRef.current.setLocalDescription(sdp);
      console.log("sent the offer");
      socketRef.current.emit("offer", sdp, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescription) => {
    console.log("createAnswer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }

    try {
      pcRef.current.setRemoteDescription(sdp);
      const answerSdp = await pcRef.current.createAnswer();
      pcRef.current.setLocalDescription(answerSdp);

      console.log("sent the answer");
      socketRef.current.emit("answer", answerSdp, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socketRef.current = io("http://52.79.37.100:30077/signaling");

    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    socketRef.current.on("all_users", (allUsers: Array<{ id: string }>) => {
      if (allUsers.length > 0) {
        createOffer();
      }
    });

    socketRef.current.on("getOffer", (sdp: RTCSessionDescription) => {
      console.log("recv Offer");
      createAnswer(sdp);
    });

    socketRef.current.on("getAnswer", (sdp: RTCSessionDescription) => {
      console.log("recv Answer");
      if (!pcRef.current) {
        return;
      }
      pcRef.current.setRemoteDescription(sdp);
    });

    socketRef.current.on("getCandidate", async (candidate: RTCIceCandidate) => {
      if (!pcRef.current) {
        return;
      }

      await pcRef.current.addIceCandidate(candidate);
    });

    socketRef.current.emit("join_room", {
      room: roomName,
    });

    getMedia();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        ref={myVideoRef}
        autoPlay
      />
      <video
        id="remotevideo"
        style={{
          width: 240,
          height: 240,
          backgroundColor: "black",
        }}
        ref={remoteVideoRef}
        autoPlay
      />
    </div>
  );
};

export default VideoCall;
