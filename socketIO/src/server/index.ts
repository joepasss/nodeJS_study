import { createServer } from "http";
import { Server, Socket } from "socket.io";
import "dotenv/config";

const port = process.env.PORT;

const server = createServer();

const io = new Server(server);

io.on("connection", (socket: Socket) => {
  console.log(`a user connected!: ${socket.id}`);
});

server.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
