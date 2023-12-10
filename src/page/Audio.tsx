import React from "react";

interface AudioProps {
  stream: MediaStream;
  id: string;
  setAudio: (arg0: string, arg1: HTMLAudioElement) => void;
}

const Audio = (props: AudioProps) => {
  const audioRef = (audio: HTMLAudioElement | null) => {
    if (audio) {
      audio!.srcObject = props.stream;
      props.setAudio(props.id, audio);
    }
  };

  return props.stream === (null || undefined) ? <div>Loading...</div> : <audio autoPlay ref={audioRef}></audio>;
};

export default React.memo(Audio);
