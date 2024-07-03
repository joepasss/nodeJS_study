import { createServer } from "http";
import { Server, Socket } from "socket.io";

import "dotenv/config";

const port = process.env.PORT;

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:9000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`a user connected!: ${socket.id}`);

  socket.emit("message", `Hello ${socket.id}`);

  socket.broadcast.emit("message", `say hello to ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`socket disconnected!: ${socket.id}`);

    socket.broadcast.emit("message", `${socket.id} has left...`);
  });
});

server.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});

setInterval(() => {
  io.emit("message", Math.floor(Math.random() * 100));
}, 1000);
