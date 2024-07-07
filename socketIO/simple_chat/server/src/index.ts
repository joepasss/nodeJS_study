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
  socket.emit("message", {
    id: `${socket.id}`,
    from_server: true,
    message: `Hello ${socket.id}`,
  });

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`socket disconnected!: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
