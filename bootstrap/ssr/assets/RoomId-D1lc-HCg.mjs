import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import { B as Button } from "./button-CjC9Szlf.mjs";
import { MicOff, Mic, VideoOff, Video, PhoneOff } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function VideoStream({ stream, peerId }) {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 rounded-lg overflow-hidden h-full relative", children: [
    /* @__PURE__ */ jsx(
      "video",
      {
        ref: videoRef,
        autoPlay: true,
        playsInline: true,
        className: "w-full h-full object-cover"
      }
    ),
    !stream && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-slate-900", children: /* @__PURE__ */ jsxs("span", { className: "text-slate-400", children: [
      "Waiting for ",
      peerId,
      "..."
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 left-2 bg-slate-900 px-2 py-1 rounded text-white text-xs", children: [
      peerId.substring(0, 8),
      "..."
    ] })
  ] });
}
function VideoRoom({ roomId }) {
  const [socket, setSocket] = useState(null);
  const [remotePeers, setRemotePeers] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const localVideoRef = useRef(null);
  const peerConnectionsRef = useRef(/* @__PURE__ */ new Map());
  const remoteStreamsRef = useRef(/* @__PURE__ */ new Map());
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError(
          "Failed to access camera/microphone. Please check permissions."
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
      reconnectionDelay: 1e3,
      reconnectionDelayMax: 5e3,
      reconnectionAttempts: 5
    });
    socketInstance.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);
      console.log("joining rooo");
      socketInstance.emit("join-room", { roomId });
    });
    socketInstance.on("user-joined", (data) => {
      console.log("User joined:", data.userId);
      if (localStream) {
        createPeerConnection(data.userId, true, socketInstance, localStream);
      }
    });
    socketInstance.on(
      "offer",
      async (data) => {
        console.log("Received offer from:", data.from);
        if (localStream) {
          await handleOffer(data.from, data.offer, socketInstance, localStream);
        }
      }
    );
    socketInstance.on(
      "answer",
      async (data) => {
        console.log("Received answer from:", data.from);
        const peerConnection = peerConnectionsRef.current.get(data.from);
        if (peerConnection) {
          try {
            await peerConnection.setRemoteDescription(
              new RTCSessionDescription(data.answer)
            );
          } catch (err) {
            console.error("Error setting remote description for answer:", err);
          }
        }
      }
    );
    socketInstance.on(
      "ice-candidate",
      async (data) => {
        const peerConnection = peerConnectionsRef.current.get(data.from);
        if (peerConnection && data.candidate) {
          try {
            await peerConnection.addIceCandidate(
              new RTCIceCandidate(data.candidate)
            );
          } catch (err) {
            console.error("Error adding ICE candidate:", err);
          }
        }
      }
    );
    socketInstance.on("user-left", (data) => {
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
  const createPeerConnection = (peerId, initiator, socketInstance, localStream2) => {
    if (peerConnectionsRef.current.has(peerId)) {
      console.log("Peer connection already exists for", peerId);
      return;
    }
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }]
    });
    if (localStream2) {
      localStream2.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream2);
      });
    }
    peerConnection.ontrack = (event) => {
      console.log("Received remote track from", peerId, ":", event.track.kind);
      const remoteStream = event.streams[0];
      remoteStreamsRef.current.set(peerId, remoteStream);
      setRemotePeers((prev) => {
        const existing = prev.find((p) => p.peerId === peerId);
        if (existing) {
          return prev.map(
            (p) => p.peerId === peerId ? { ...p, stream: remoteStream } : p
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
          sdpMid: event.candidate.sdpMid
        });
      }
    };
    peerConnection.onconnectionstatechange = () => {
      console.log(
        `Connection state with ${peerId}:`,
        peerConnection.connectionState
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
  const handleOffer = async (from, offer, socketInstance, localStream2) => {
    if (!peerConnectionsRef.current.has(from)) {
      createPeerConnection(from, false, socketInstance, localStream2);
    }
    const peerConnection = peerConnectionsRef.current.get(from);
    if (peerConnection) {
      try {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer)
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
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-screen bg-black flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-slate-900 border-b border-slate-700 p-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-white text-xl font-semibold", children: [
        "Room: ",
        /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: roomId })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-slate-300 text-sm", children: isConnected ? "Connected" : "Disconnected" })
      ] })
    ] }) }),
    error && /* @__PURE__ */ jsx("div", { className: "bg-red-900 text-red-100 p-4 text-center", children: error }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto p-4", children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: `grid gap-4 auto-rows-max max-w-7xl mx-auto`,
        style: {
          // Dynamic columns: pick the square root of participants for a balanced grid
          gridTemplateColumns: `repeat(${Math.ceil(
            Math.sqrt(remotePeers.length + 1)
          )}, 1fr)`,
          // Dynamic row height to fill the viewport
          gridAutoRows: `${Math.floor(
            100 / Math.ceil(
              (remotePeers.length + 1) / Math.ceil(Math.sqrt(remotePeers.length + 1))
            )
          )}vh`
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-800 rounded-lg overflow-hidden h-full relative", children: [
            /* @__PURE__ */ jsx(
              "video",
              {
                ref: localVideoRef,
                autoPlay: true,
                playsInline: true,
                muted: true,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 left-2 bg-slate-900 px-2 py-1 rounded text-white text-xs", children: "You" })
          ] }),
          remotePeers.map((peer) => /* @__PURE__ */ jsx(
            VideoStream,
            {
              stream: peer.stream,
              peerId: peer.peerId
            },
            peer.peerId
          ))
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "bg-slate-900 border-t border-slate-700 p-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: toggleMute,
          variant: isMuted ? "destructive" : "default",
          size: "lg",
          className: "flex items-center gap-2",
          children: [
            isMuted ? /* @__PURE__ */ jsx(MicOff, { size: 20 }) : /* @__PURE__ */ jsx(Mic, { size: 20 }),
            isMuted ? "Unmute" : "Mute"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: toggleCamera,
          variant: isCameraOff ? "destructive" : "default",
          size: "lg",
          className: "flex items-center gap-2",
          children: [
            isCameraOff ? /* @__PURE__ */ jsx(VideoOff, { size: 20 }) : /* @__PURE__ */ jsx(Video, { size: 20 }),
            isCameraOff ? "Camera Off" : "Camera On"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: leaveCall,
          variant: "destructive",
          size: "lg",
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx(PhoneOff, { size: 20 }),
            "Leave Call"
          ]
        }
      )
    ] }) })
  ] });
}
function RoomPage({ roomId }) {
  return /* @__PURE__ */ jsx(VideoRoom, { roomId });
}
export {
  RoomPage as default
};
