import { useState, useRef } from "react";

const SdpOffer = () => {
  const [output, setOutput] = useState("");
  const audioInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  const vadInput = useRef<HTMLInputElement>(null);
  const restartInput = useRef<HTMLInputElement>(null);

  const createOffer = async () => {
    setOutput("");
    const peerConnection = new RTCPeerConnection(null);

    const offerOptions = {
      offerToReceiveAudio: audioInput.current && audioInput.current.checked ? 1 : 0,
      offerToReceiveVideo: videoInput.current && videoInput.current.checked ? 1 : 0,
      voiceActivityDetection: vadInput.current && vadInput.current.checked,
      iceRestart: restartInput.current && restartInput.current.checked,
    };

    try {
      const offer = await peerConnection.createOffer(offerOptions);
      setOutput(offer.sdp);
    } catch (e) {
      setOutput(`Failed to create offer: ${e}`);
    }
  };

  return (
    <div className="text-center">
      <h1>Simple WebRTC Signaling Server</h1>
      <div id="constraints">
        <div>
          <input id="audio" type="checkbox" ref={audioInput} />
          <label htmlFor="audio">Offer to receive audio</label>
        </div>
        <div>
          <input id="video" type="checkbox" ref={videoInput} />
          <label htmlFor="video">Offer to receive video</label>
        </div>
        <div>
          <input id="vad" type="checkbox" ref={vadInput} />
          <label htmlFor="vad">Voice activity detection</label>
        </div>
        <div>
          <input id="restart" type="checkbox" ref={restartInput} />
          <label htmlFor="restart">Ice restart</label>
        </div>
      </div>
      <button type="button" className="btn btn-primary" id="createOffer" onClick={createOffer}>
        Create offer
      </button>
      <textarea id="output" className="col-md-12" rows={8} value={output} readOnly />
    </div>
  );
};

export default SdpOffer;
