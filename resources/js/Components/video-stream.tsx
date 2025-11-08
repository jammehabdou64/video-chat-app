import { useEffect, useRef } from "react";

interface VideoStreamProps {
  stream?: MediaStream;
  peerId: string;
}

export default function VideoStream({ stream, peerId }: VideoStreamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden h-full relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <span className="text-slate-400">Waiting for {peerId}...</span>
        </div>
      )}
      <div className="absolute bottom-2 left-2 bg-slate-900 px-2 py-1 rounded text-white text-xs">
        {peerId.substring(0, 8)}...
      </div>
    </div>
  );
}
