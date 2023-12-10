import { useRef } from "react";

const Streaming = () => {
  const localVideo = useRef<HTMLVideoElement>(null);
  let localStream: MediaStream;

  const qvgaConstraints = {
    video: { width: { exact: 320 }, height: { exact: 240 } },
    audio: true,
  };
  const vgaConstraints = {
    video: { width: { exact: 640 }, height: { exact: 480 } },
    audio: true,
  };
  const hdConstraints = {
    video: { width: { exact: 1280 }, height: { exact: 720 } },
    audio: true,
  };

  const getMedia = (constraints: MediaStreamConstraints) => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    navigator.mediaDevices.getUserMedia(constraints).then(getLocalMediaStream).catch(handleLocalMediaStreamError);
  };

  const getLocalMediaStream = (mediaStream: MediaStream) => {
    localStream = mediaStream;
    if (localVideo.current) {
      localVideo.current.srcObject = mediaStream;
    }
  };

  const handleLocalMediaStreamError = (error: any) => {
    console.log("navigator.getUserMedia error: ", error);
  };

  return (
    <>
      <h1>Simple WebRTC Signalling Server</h1>
      <div className="d-flex justify-content-around mb-3">
        <div id="buttons" className="">
          <button type="button" className="btn btn-primary" onClick={() => getMedia(qvgaConstraints)}>
            QVGA
          </button>
          <button type="button" className="btn btn-primary" onClick={() => getMedia(vgaConstraints)}>
            VGA
          </button>
          <button type="button" className="btn btn-primary" onClick={() => getMedia(hdConstraints)}>
            HD
          </button>
        </div>
      </div>
      <div id="videoblock" className="col-lg-12 mb-3">
        <video ref={localVideo} autoPlay playsInline></video>
      </div>
    </>
  );
};

export default Streaming;
