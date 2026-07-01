import { Application } from "jcc-express-mvc/Core";
import { SocketProvider } from "jcc-express-mvc/Core/Provider";

export class SocketIOServiceProvider extends SocketProvider {
  //
  constructor(protected app: Application) {
    super(app);
  }

  register(): void {}

  boot(): void {
    const socketRooms = new Map<string, string>();

    this.io.on("connection", (socket) => {
      console.log("New user connected:", socket.id);

      socket.on("join-room", ({ roomId }) => {
        console.log(`User ${socket.id} joining room ${roomId}`);

        socket.join(roomId);
        socketRooms.set(socket.id, roomId);

        const usersInRoom = Array.from(
          this.io.sockets.adapter.rooms.get(roomId) || [],
        );

        socket.emit("all-users", {
          users: usersInRoom.filter((id) => id !== socket.id),
        });

        socket.to(roomId).emit("user-joined", { userId: socket.id });
      });

      socket.on("offer", ({ to, offer }) => {
        this.io.to(to).emit("offer", { from: socket.id, offer });
      });

      socket.on("answer", ({ to, answer }) => {
        this.io.to(to).emit("answer", { from: socket.id, answer });
      });

      socket.on("ice-candidate", ({ to, candidate, sdpMLineIndex, sdpMid }) => {
        this.io.to(to).emit("ice-candidate", {
          from: socket.id,
          candidate: {
            candidate,
            sdpMLineIndex,
            sdpMid,
          },
        });
      });

      socket.on("leave-room", ({ roomId }) => {
        socket.leave(roomId);
        socketRooms.delete(socket.id);
        socket.to(roomId).emit("user-left", { userId: socket.id });
      });

      socket.on("disconnect", () => {
        const roomId = socketRooms.get(socket.id);
        if (roomId) {
          socket.to(roomId).emit("user-left", { userId: socket.id });
          socketRooms.delete(socket.id);
        }
      });
    });
  }
}
