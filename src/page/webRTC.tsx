import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const VideoCallComponent: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [roomId, setRoomId] = useState<string>(""); // 방 번호 상태 추가
  const webSocket = useRef<WebSocket | null>(null);
  const stompClient = useRef<Stomp.Client | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    // WebSocket 연결
    const socket = new SockJS("http://52.79.37.100:32408/signaling"); // 백엔드 WebSocket 엔드포인트
    webSocket.current = new WebSocket("ws://52.79.37.100:32408/signaling"); // WebSocket 연결
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, () => {
      console.log("WebSocket connected");
      stompClient.current.subscribe("/topic/messages", (message) => {
        handleMessage(JSON.parse(message.body));
      });
    });

    // peerConnection 설정
    peerConnection.current = new RTCPeerConnection();
    peerConnection.current.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    // 로컬 미디어 스트림 가져오기
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        stream.getTracks().forEach((track) => peerConnection.current?.addTrack(track, stream));
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    // cleanup 함수
    return () => {
      // 연결 종료 및 리소스 정리
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      if (webSocket.current) {
        webSocket.current.close();
      }
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, []);

  const handleMessage = (message: any) => {
    // 받은 메시지 처리
    // 예: Offer, Answer, ICE 메시지 처리
  };

  const createOfferAndSend = async () => {
    try {
      if (peerConnection.current) {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        const key = Math.random().toString(36).substr(2, 10); // 랜덤 Key 생성
        stompClient.current?.send(`/app/peer/offer/${key}/${roomId}`, {}, JSON.stringify(offer)); // 방번호와 랜덤 Key 전송
      }
    } catch (error) {
      console.error("Error creating and sending offer:", error);
    }
  };

  const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(event.target.value);
  };

  return (
    <div>
      <input type="text" value={roomId} onChange={handleRoomIdChange} placeholder="Enter Room ID" />
      {localStream && (
        <video
          ref={(videoElement) => {
            if (videoElement && localStream) {
              videoElement.srcObject = localStream;
            }
          }}
          autoPlay
          playsInline
        />
      )}
      {remoteStream && (
        <video
          ref={(videoElement) => {
            if (videoElement && remoteStream) {
              videoElement.srcObject = remoteStream;
            }
          }}
          autoPlay
          playsInline
        />
      )}

      <button onClick={createOfferAndSend}>Start Call</button>
      {/* 다른 컨트롤들 추가 */}
    </div>
  );
};

export default VideoCallComponent;
