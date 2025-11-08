import { useEffect, useRef, useState } from "react";
import io, { type Socket } from "socket.io-client";
import { Button } from "@/Components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import VideoStream from "./video-stream";

interface RemotePeer {
  peerId: string;
  stream?: MediaStream;
}

export default function VideoRoom({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [remotePeers, setRemotePeers] = useState<RemotePeer[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const remoteStreamsRef = useRef<Map<string, MediaStream>>(new Map());

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError(
          "Failed to access camera/microphone. Please check permissions.",
        );
        console.error("Media access error:", err);
      }
    };

    initializeMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const socketInstance = io("/", {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socketInstance.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
      console.log("joining rooo");
      socketInstance.emit("join-room", { roomId });
    });

    socketInstance.on("user-joined", (data: { userId: string }) => {
      console.log("User joined:", data.userId);
      if (localStream) {
        createPeerConnection(data.userId, true, socketInstance, localStream);
      }
    });

    socketInstance.on(
      "offer",
      async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
        console.log("Received offer from:", data.from);
        if (localStream) {
          await handleOffer(data.from, data.offer, socketInstance, localStream);
        }
      },
    );

    socketInstance.on(
      "answer",
      async (data: { from: string; answer: RTCSessionDescriptionInit }) => {
        console.log("Received answer from:", data.from);
        const peerConnection = peerConnectionsRef.current.get(data.from);
        if (peerConnection) {
          try {
            await peerConnection.setRemoteDescription(
              new RTCSessionDescription(data.answer),
            );
          } catch (err) {
            console.error("Error setting remote description for answer:", err);
          }
        }
      },
    );

    socketInstance.on(
      "ice-candidate",
      async (data: { from: string; candidate: RTCIceCandidateInit }) => {
        const peerConnection = peerConnectionsRef.current.get(data.from);
        if (peerConnection && data.candidate) {
          try {
            await peerConnection.addIceCandidate(
              new RTCIceCandidate(data.candidate),
            );
          } catch (err) {
            console.error("Error adding ICE candidate:", err);
          }
        }
      },
    );

    socketInstance.on("user-left", (data: { userId: string }) => {
      console.log("User left:", data.userId);
      const peerConnection = peerConnectionsRef.current.get(data.userId);
      if (peerConnection) {
        peerConnection.close();
        peerConnectionsRef.current.delete(data.userId);
      }
      remoteStreamsRef.current.delete(data.userId);
      setRemotePeers((prev) => prev.filter((p) => p.peerId !== data.userId));
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [roomId, localStream]);

  const createPeerConnection = (
    peerId: string,
    initiator: boolean,
    socketInstance: Socket,
    localStream: MediaStream,
  ) => {
    if (peerConnectionsRef.current.has(peerId)) {
      console.log("Peer connection already exists for", peerId);
      return;
    }

    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
    });

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
    }

    peerConnection.ontrack = (event) => {
      console.log("Received remote track from", peerId, ":", event.track.kind);
      const remoteStream = event.streams[0];
      remoteStreamsRef.current.set(peerId, remoteStream);

      setRemotePeers((prev) => {
        const existing = prev.find((p) => p.peerId === peerId);
        if (existing) {
          return prev.map((p) =>
            p.peerId === peerId ? { ...p, stream: remoteStream } : p,
          );
        }
        return [...prev, { peerId, stream: remoteStream }];
      });
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketInstance.emit("ice-candidate", {
          to: peerId,
          candidate: event.candidate.candidate,
          sdpMLineIndex: event.candidate.sdpMLineIndex,
          sdpMid: event.candidate.sdpMid,
        });
      }
    };

    peerConnection.onconnectionstatechange = () => {
      console.log(
        `Connection state with ${peerId}:`,
        peerConnection.connectionState,
      );
    };

    peerConnectionsRef.current.set(peerId, peerConnection);

    if (initiator) {
      peerConnection.createOffer().then((offer) => {
        peerConnection.setLocalDescription(offer);
        socketInstance.emit("offer", { to: peerId, offer });
      });
    }
  };

  const handleOffer = async (
    from: string,
    offer: RTCSessionDescriptionInit,
    socketInstance: Socket,
    localStream: MediaStream,
  ) => {
    if (!peerConnectionsRef.current.has(from)) {
      createPeerConnection(from, false, socketInstance, localStream);
    }

    const peerConnection = peerConnectionsRef.current.get(from);
    if (peerConnection) {
      try {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer),
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socketInstance.emit("answer", { to: from, answer });
      } catch (err) {
        console.error("Error handling offer:", err);
      }
    }
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const leaveCall = () => {
    if (socket) {
      socket.emit("leave-room", { roomId });
      socket.disconnect();
    }

    peerConnectionsRef.current.forEach((pc) => pc.close());
    peerConnectionsRef.current.clear();

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }

    window.location.href = "/";
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col">
      <div className="bg-slate-900 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-white text-xl font-semibold">
            Room: <span className="text-blue-400">{roomId}</span>
          </h1>
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span className="text-slate-300 text-sm">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-900 text-red-100 p-4 text-center">{error}</div>
      )}

      <div className="flex-1 overflow-auto p-4">
        {/* className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max max-w-7xl mx-auto" */}
        <div
          className={`grid gap-4 auto-rows-max max-w-7xl mx-auto`}
          style={{
            // Dynamic columns: pick the square root of participants for a balanced grid
            gridTemplateColumns: `repeat(${Math.ceil(
              Math.sqrt(remotePeers.length + 1),
            )}, 1fr)`,
            // Dynamic row height to fill the viewport
            gridAutoRows: `${Math.floor(
              100 /
                Math.ceil(
                  (remotePeers.length + 1) /
                    Math.ceil(Math.sqrt(remotePeers.length + 1)),
                ),
            )}vh`,
          }}
        >
          <div className="bg-slate-800 rounded-lg overflow-hidden h-full relative">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-slate-900 px-2 py-1 rounded text-white text-xs">
              You
            </div>
          </div>

          {remotePeers.map((peer) => (
            <VideoStream
              key={peer.peerId}
              stream={peer.stream}
              peerId={peer.peerId}
            />
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border-t border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <Button
            onClick={toggleMute}
            variant={isMuted ? "destructive" : "default"}
            size="lg"
            className="flex items-center gap-2"
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>

          <Button
            onClick={toggleCamera}
            variant={isCameraOff ? "destructive" : "default"}
            size="lg"
            className="flex items-center gap-2"
          >
            {isCameraOff ? <VideoOff size={20} /> : <Video size={20} />}
            {isCameraOff ? "Camera Off" : "Camera On"}
          </Button>

          <Button
            onClick={leaveCall}
            variant="destructive"
            size="lg"
            className="flex items-center gap-2"
          >
            <PhoneOff size={20} />
            Leave Call
          </Button>
        </div>
      </div>
    </div>
  );
}
