import VideoRoom from "@/Components/video-room";

export default function RoomPage({ roomId }: { roomId: string }) {
  return <VideoRoom roomId={roomId} />;
}
