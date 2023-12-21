// let remoteStreamElement = document.querySelector('#remoteStream');
let localStreamElement = document.querySelector("#localStream");
const myKey = Math.random().toString(36).substring(2, 11);
let pcListMap = new Map();
let roomId;
let otherKeyList = [];
let localStream = undefined;

const startCam = async () => {
  if (navigator.mediaDevices !== undefined) {
    await navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(async (stream) => {
        console.log("Stream found");
        localStream = stream;
        // Disable the microphone by default
        stream.getAudioTracks()[0].enabled = true;
        localStreamElement.srcObject = localStream;
        // Connect after making sure that local stream is availble
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  }
};

const connectSocket = async () => {
  const socket = new SockJS("http://52.79.37.100:32408/signaling");
  stompClient = Stomp.over(socket);
  stompClient.debug = null;

  stompClient.connect({}, function () {
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

      pcListMap.set(key, createPeerConnection(key));
      pcListMap.get(key).setRemoteDescription(new RTCSessionDescription({ type: message.type, sdp: message.sdp }));
      sendAnswer(pcListMap.get(key), key);
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

      if (myKey !== key && otherKeyList.find((mapKey) => mapKey === myKey) === undefined) {
        otherKeyList.push(key);
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

let onIceCandidate = (event, otherKey) => {
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

//룸 번호 입력 후 캠 + 웹소켓 실행
document.querySelector("#enterRoomBtn").addEventListener("click", async () => {
  await startCam();

  if (localStream !== undefined) {
    document.querySelector("#localStream").style.display = "block";
    document.querySelector("#startSteamBtn").style.display = "";
  }
  roomId = document.querySelector("#roomIdInput").value;
  document.querySelector("#roomIdInput").disabled = true;
  document.querySelector("#enterRoomBtn").disabled = true;

  await connectSocket();
});

// 스트림 버튼 클릭시 , 다른 웹 key들 웹소켓을 가져 온뒤에 offer -> answer -> iceCandidate 통신
// peer 커넥션은 pcListMap 으로 저장
document.querySelector("#startSteamBtn").addEventListener("click", async () => {
  await stompClient.send(`/app/call/key`, {}, {});

  setTimeout(() => {
    otherKeyList.map((key) => {
      if (!pcListMap.has(key)) {
        pcListMap.set(key, createPeerConnection(key));
        sendOffer(pcListMap.get(key), key);
      }
    });
  }, 1000);
});
