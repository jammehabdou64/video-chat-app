import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { router } from "@inertiajs/react";

export default function Home() {
  const [roomId, setRoomId] = useState("");

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      router.visit(`/room/${roomId}`, { replace: true });
    }
  };

  const handleRandomRoom = () => {
    const randomId = Math.random().toString(36).substring(7);
    router.visit(`/room/${randomId}`);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-2">Video Call</h1>
        <p className="text-slate-300 mb-8">Join a room and start calling</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Room ID
            </label>
            <Input
              type="text"
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleJoinRoom()}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
            />
          </div>

          <Button
            onClick={handleJoinRoom}
            disabled={!roomId.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Join Room
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">or</span>
            </div>
          </div>

          <Button
            onClick={handleRandomRoom}
            variant="outline"
            className="w-full border-slate-600 text-white hover:bg-slate-700 bg-transparent"
          >
            Create Random Room
          </Button>
        </div>
      </div>
    </main>
  );
}
