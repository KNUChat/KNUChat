import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";

const WebRTCVideoChat: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const webSocket = useRef<SockJS | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startWebRTC = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    startWebRTC();
  }, []);

  useEffect(() => {
    const createOfferAndSend = async () => {
      if (localStream) {
        const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
        peerConnection.current = new RTCPeerConnection(configuration);

        localStream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, localStream);
        });

        // Sock.js를 사용하여 웹소켓 연결
        webSocket.current = new SockJS("http://52.79.37.100:32408/signaling");

        webSocket.current.onopen = () => {
          console.log("WebSocket 연결 성공!");
          createOffer();
        };

        webSocket.current.onclose = () => {
          console.log("WebSocket 연결 종료");
        };

        webSocket.current.onmessage = async (event) => {
          const message = JSON.parse(event.data);
          if (message.type === "/peer/offer") {
            const offer = new RTCSessionDescription(message.offer);
            await peerConnection.current?.setRemoteDescription(offer);

            const answer = await peerConnection.current?.createAnswer();
            await peerConnection.current?.setLocalDescription(answer);
            sendAnswer("clientKey", "1", answer);
          } else if (message.type === "/peer/answer") {
            const answer = new RTCSessionDescription(message.answer);
            await peerConnection.current?.setRemoteDescription(answer);
          } else if (message.type === "/peer/iceCandidate") {
            const candidate = new RTCIceCandidate(message.candidate);
            await peerConnection.current?.addIceCandidate(candidate);
          }
        };
      }
    };

    const createOffer = async () => {
      const offer = await peerConnection.current?.createOffer();
      if (offer) {
        await peerConnection.current?.setLocalDescription(offer);
        sendOffer("clientKey", "1", offer);
      }
    };

    const sendOffer = async (key: string, roomId: string, offer: RTCSessionDescriptionInit) => {
      const offerMessage = {
        type: "/peer/offer/" + key + "/" + roomId,
        offer,
      };
      webSocket.current?.send(JSON.stringify(offerMessage));
    };

    const sendAnswer = async (key: string, roomId: string, answer: RTCSessionDescriptionInit) => {
      const answerMessage = {
        type: "/peer/answer/" + key + "/" + roomId,
        answer,
      };
      webSocket.current?.send(JSON.stringify(answerMessage));
    };

    const sendIceCandidate = async (key: string, roomId: string, candidate: RTCIceCandidate) => {
      const iceMessage = {
        type: "/peer/iceCandidate/" + key + "/" + roomId,
        candidate,
      };
      webSocket.current?.send(JSON.stringify(iceMessage));
    };

    const attachStreamToVideo = (stream: MediaStream | null, videoRef: React.RefObject<HTMLVideoElement>) => {
      if (stream && videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    attachStreamToVideo(localStream, localVideoRef);
    attachStreamToVideo(remoteStream, remoteVideoRef);

    return () => {
      webSocket.current?.close();
      peerConnection.current?.close();
      setLocalStream(null);
      setRemoteStream(null);
    };

    createOfferAndSend();
  }, [localStream]);

  return (
    <div>
      <div>
        {/* 로컬 비디오 스트림 */}
        <video ref={localVideoRef} autoPlay muted />
      </div>
      <div>
        {/* 원격 비디오 스트림 */}
        <video ref={remoteVideoRef} autoPlay />
      </div>
    </div>
  );
};

export default WebRTCVideoChat;
