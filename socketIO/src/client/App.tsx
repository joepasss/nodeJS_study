import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const App = () => {
  const [socketId, setSocketId] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    socket.on("connect", () => {
      if (socket.id != undefined) {
        setSocketId(socket.id);
        console.log(`socket id: ${socket.id}`);
      }
    });

    socket.on("message", (msg: string) => {
      if (msg != undefined) {
        setMsg(msg);
      }
    });
  }, []);

  return (
    <div>
      <h1>SOCKET_ID</h1>
      {socketId && <p>Connected: {socketId}</p>}
      {msg && <p>MSG: {msg}</p>}
    </div>
  );
};

export default App;
