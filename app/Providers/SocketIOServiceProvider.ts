import { Application } from "jcc-express-mvc/Core";
import { SocketProvider } from "jcc-express-mvc/Core/Provider";

export class SocketIOServiceProvider extends SocketProvider {
  //
  constructor(protected app: Application) {
    super(app);
  }

  register(): void {}

  boot(): void {
    const rooms = new Map();

    this.io.on("connection", (socket) => {
      console.log("New user connected:", socket.id);

      socket.on("join-room", ({ roomId }) => {
        console.log(`User ${socket.id} joining room ${roomId}`);

        // Get all existing users in the room
        const usersInRoom = Array.from(
          this.io.sockets.adapter.rooms.get(roomId) || [],
        );

        // Let the new user know who is already in the room
        socket.emit("all-users", {
          users: usersInRoom.filter((id) => id !== socket.id),
        });

        // Notify everyone else that a new user has joined
        socket.to(roomId).emit("user-joined", { userId: socket.id });

        // Join the room
        socket.join(roomId);

        socket.join(roomId);
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
        this.io.to(roomId).emit("user-left", { userId: socket.id });
      });

      socket.on("disconnect", () => {
        socket.rooms.forEach((room) => {
          this.io.to(room).emit("user-left", { userId: socket.id });
        });
      });
    });
  }
}
