import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import Audio from "./Audio";

// for game
interface Vector {
  x: number;
  y: number;
}

interface IPlayer {
  color: string;
  centerPos: Vector;
  radius: number;
  volume: number;
  draw: (arg0: CanvasRenderingContext2D) => void;
}

class Me implements IPlayer {
  color: string;
  centerPos: Vector;
  velocity: Vector;
  radius: number;
  originRadius: number;
  volume: number;
  analyser: AnalyserNode;
  isUp: boolean;
  isDown: boolean;
  isLeft: boolean;
  isRight: boolean;
  constructor(centerPos: Vector, velocity: Vector, stream: MediaStream, radius: number = 10, color = "hsl(" + 360 * Math.random() + ", 50%, 50%)") {
    this.color = color;
    this.centerPos = centerPos;
    this.velocity = velocity;
    this.radius = radius;
    this.originRadius = radius;
    this.volume = 0;
    this.isUp = false;
    this.isDown = false;
    this.isLeft = false;
    this.isRight = false;

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    this.analyser = audioContext.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.4;
    this.analyser.fftSize = 1024;
    source.connect(this.analyser);
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.centerPos.x, this.centerPos.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
    if (this.volume > 20) {
      ctx.strokeStyle = "#33FF33";
      ctx.lineWidth = 1;
      ctx.beginPath();

      ctx.arc(this.centerPos.x, this.centerPos.y, this.radius - ctx.lineWidth / 2, 0, Math.PI * 2, true);
      ctx.stroke();
    }
  }
  update(millis: number) {
    const array = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(array);
    this.volume =
      array.reduce((acc, cur) => {
        return acc + cur;
      }, 0) / array.length;
    if (this.isUp) this.centerPos.y -= this.velocity.y * millis;
    if (this.isDown) this.centerPos.y += this.velocity.y * millis;
    if (this.isLeft) this.centerPos.x -= this.velocity.x * millis;
    if (this.isRight) this.centerPos.x += this.velocity.x * millis;
    this.radius = this.originRadius + this.volume / 10;
  }
}

//

interface OfferAnswerDto {
  fromClientId: string;
  toClientId: string;
  sdp: RTCSessionDescriptionInit;
}

interface IceDto {
  fromClientId: string;
  toClientId: string;
  ice: RTCIceCandidate;
}

export class Peer extends RTCPeerConnection implements IPlayer {
  connectedClientSocketId: string;
  socketId: string;
  remoteStreams: MediaStream[];
  dc: RTCDataChannel;
  connectedAudioElement: HTMLAudioElement | null;
  //IPlayer
  color: string;
  centerPos: Vector;
  radius: number;
  volume: number;
  //
  constructor(connectedClientSocketId: string, socketId: string, pcConfig?: RTCConfiguration) {
    super(pcConfig);
    this.connectedClientSocketId = connectedClientSocketId;
    this.socketId = socketId;
    this.remoteStreams = [];

    //IPlayer
    this.color = "#000000";
    this.centerPos = { x: 0, y: 0 };
    this.radius = 10;
    this.volume = 0;
    //
    this.dc = this.createDataChannel("dc");
    this.connectedAudioElement = null;
    this.ondatachannel = (event) => {
      const receviedDC = event.channel;
      receviedDC.onmessage = (event) => {
        const data = JSON.parse(event.data) as IPlayer;
        this.color = data.color;
        this.centerPos = data.centerPos;
        this.radius = data.radius;
        this.volume = data.volume;
      };
      receviedDC.onopen = (event) => {
        console.log("dataChannel created");
      };
      receviedDC.onclose = () => {
        console.log("dataChannel closed");
      };
    };
  }

  setConnectedAudioElement(audio: HTMLAudioElement) {
    this.connectedAudioElement = audio;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.centerPos.x, this.centerPos.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
    if (this.volume > 20) {
      ctx.strokeStyle = "#33FF33";
      ctx.lineWidth = 1;
      ctx.beginPath();

      ctx.arc(this.centerPos.x, this.centerPos.y, this.radius - ctx.lineWidth / 2, 0, Math.PI * 2, true);
      ctx.stroke();
    }
  }
}

class PeerManager {
  static Config: RTCConfiguration = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
  peers: Map<string, Peer>;
  socket: Socket;
  setPeers: React.Dispatch<React.SetStateAction<Peer[]>>;
  localStream: MediaStream;
  pcConfig: RTCConfiguration | undefined;
  me: Me;
  drawContext: CanvasRenderingContext2D;
  lastUpdateTimeStamp: number;
  constructor(
    socket: Socket,
    localStream: MediaStream,
    setPeers: React.Dispatch<React.SetStateAction<Peer[]>>,
    drawContext: CanvasRenderingContext2D,
    pcConfig?: RTCConfiguration,
    roomId?: string
  ) {
    this.me = new Me({ x: 0, y: 0 }, { x: 0.2, y: 0.2 }, localStream);
    this.lastUpdateTimeStamp = Date.now();
    this.drawContext = drawContext;
    this.localStream = localStream;
    this.socket = socket;
    this.setPeers = setPeers;
    if (pcConfig) this.pcConfig = pcConfig;
    else this.pcConfig = PeerManager.Config;
    this.peers = new Map();

    socket.on("offer", (offerDto: OfferAnswerDto) => {
      if (!this.peers.has(offerDto.fromClientId)) {
        this.createPeerWithEventSetting(offerDto.fromClientId, offerDto.toClientId);
      }
      const offeredPeer = this.peers.get(offerDto.fromClientId)!;
      offeredPeer.setRemoteDescription(offerDto.sdp);
      offeredPeer
        .createAnswer()
        .then((sdp) => {
          offeredPeer.setLocalDescription(sdp);
          const answerDto: OfferAnswerDto = {
            fromClientId: offeredPeer.socketId,
            toClientId: offeredPeer.connectedClientSocketId,
            sdp: sdp,
          };
          this.socket.emit("answer", answerDto);
        })
        .catch((error) => {
          console.error(`Peer SocketId: ${offeredPeer.connectedClientSocketId} createAnswer fail=> ${error.toString()}`);
        });
    });

    socket.on("needToOffer", (toSocketIds: string[]) => {
      console.log("needToOfferCalled");
      toSocketIds.forEach((connectedSocketId) => {
        if (connectedSocketId !== this.socket.id) {
          const newPeer = this.createPeerWithEventSetting(connectedSocketId, this.socket.id);
          newPeer
            .createOffer()
            .then((sdp) => {
              newPeer.setLocalDescription(sdp);
              const offerDto: OfferAnswerDto = {
                toClientId: newPeer.connectedClientSocketId,
                fromClientId: newPeer.socketId,
                sdp: sdp,
              };
              this.socket.emit("offer", offerDto);
            })
            .catch((error) => {
              console.error(`Peer SocketId: ${newPeer.connectedClientSocketId} createAnswer fail=> ${error.toString()}`);
            });
        }
      });
    });

    this.socket.on("answer", (answerDto: OfferAnswerDto) => {
      const answeredPeer = this.peers.get(answerDto.fromClientId);
      if (answeredPeer) {
        answeredPeer.setRemoteDescription(answerDto.sdp);
      }
    });

    this.socket.on("ice", (iceDto: IceDto) => {
      const icedPeer = this.peers.get(iceDto.fromClientId);
      if (icedPeer) {
        icedPeer.addIceCandidate(new RTCIceCandidate(iceDto.ice)).catch((error) => {
          console.error(`addIceCandidate Fail : ${error.toString()}`);
        });
      }
    });

    socket.emit("joinRoom", roomId || "honleeExample");
    //game start
    //
    const animationCallBack = () => {
      this.drawContext.fillStyle = "#000000";
      this.drawContext.fillRect(0, 0, 800, 600);
      //this.drawContext.clearRect(0, 0, 800, 600);
      const dateNow = Date.now();
      this.me.update(dateNow - this.lastUpdateTimeStamp);
      this.me.draw(this.drawContext);
      this.peers.forEach((peer) => {
        if (peer.dc.readyState === "open") peer.dc.send(JSON.stringify(this.me));
        peer.draw(this.drawContext);

        if (peer.connectedAudioElement) {
          const distance = Math.sqrt(Math.pow(this.me.centerPos.x - peer.centerPos.x, 2) + Math.pow(this.me.centerPos.y - peer.centerPos.y, 2));

          peer.connectedAudioElement!.volume = Math.max(1 - distance / 650, 0);
        }
      });
      requestAnimationFrame(animationCallBack);

      this.lastUpdateTimeStamp = dateNow;
    };
    requestAnimationFrame(animationCallBack);
  }
  createPeerWithEventSetting(connectedClientSocketId: string, socketId: string): Peer {
    const newPeer = new Peer(connectedClientSocketId, socketId, this.pcConfig);

    this.localStream.getTracks().forEach((track) => {
      newPeer.addTrack(track, this.localStream);
    });

    this.setPeers((prev) => {
      return [...prev, newPeer];
    });
    this.peers.set(connectedClientSocketId, newPeer);

    newPeer.addEventListener("icecandidate", (event) => {
      const iceCandidate = event.candidate;
      if (iceCandidate) {
        const iceDto: IceDto = {
          toClientId: newPeer.connectedClientSocketId,
          fromClientId: newPeer.socketId,
          ice: iceCandidate,
        };
        this.socket.emit("ice", iceDto);
      }
    });
    newPeer.addEventListener("track", (event) => {
      newPeer.remoteStreams = event.streams.concat();
    });
    newPeer.addEventListener("connectionstatechange", (event) => {
      const targetPeer = event.target as Peer;
      if (targetPeer.connectionState === "closed" || targetPeer.connectionState === "disconnected" || targetPeer.connectionState === "failed") {
        this.peers.delete(targetPeer.connectedClientSocketId);
        this.setPeers((prev) => {
          return prev.filter((peer) => {
            return peer.connectedClientSocketId !== targetPeer.connectedClientSocketId;
          });
        });
      } else if (targetPeer.connectionState === "connected") {
        this.setPeers((prev) => {
          return prev.concat();
        });
      }
    });
    return newPeer;
  }
}

const App = () => {
  const [peers, setPeers] = useState<Peer[]>([]);
  const localStream = useRef<MediaStream | null>(null);
  const peerManager = useRef<PeerManager | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (localStream.current) return;
    if (!canvasRef.current) return;
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream: MediaStream) => {
        localStream.current = stream;
        const socket = io("http://52.79.37.100:30077/");
        //const socket = io("http://localhost:8080");
        peerManager.current = new PeerManager(socket, stream, setPeers, canvasRef.current!.getContext("2d")!, PeerManager.Config);

        const keyEventCallBack = (event: KeyboardEvent) => {
          const me = peerManager.current!.me;

          switch (event.key) {
            case "ArrowUp": {
              if (event.type === "keydown") me.isUp = true;
              else if (event.type === "keyup") me.isUp = false;
              break;
            }
            case "ArrowLeft": {
              if (event.type === "keydown") me.isLeft = true;
              else if (event.type === "keyup") me.isLeft = false;
              break;
            }
            case "ArrowDown": {
              if (event.type === "keydown") me.isDown = true;
              else if (event.type === "keyup") me.isDown = false;
              break;
            }
            case "ArrowRight": {
              if (event.type === "keydown") me.isRight = true;
              else if (event.type === "keyup") me.isRight = false;
              break;
            }
            default: {
              break;
            }
          }
        };
        document.addEventListener("keydown", keyEventCallBack);
        document.addEventListener("keyup", keyEventCallBack);
      })
      .catch((error) => {
        console.error(`getUserMedia() Error : ${error.toString()}`);
      });
  }, []);

  const setConnectedAudioElementByID = (connectedClientId: String, audio: HTMLAudioElement) => {
    const targetPeer = peers.find((peer) => {
      return connectedClientId === peer.connectedClientSocketId;
    });
    if (!targetPeer) return;
    targetPeer.setConnectedAudioElement(audio);
  };

  return (
    <>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: "1px solid black" }}></canvas>
      {peers.map((peer) => {
        return (
          <Audio
            key={peer.connectedClientSocketId}
            stream={peer.remoteStreams[0]}
            id={peer.connectedClientSocketId}
            setAudio={setConnectedAudioElementByID}
          ></Audio>
        );
      })}
    </>
  );
};

export default App;
