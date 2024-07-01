import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000", { path: "/socket.io" });

const App = () => {
  const [socketId, setSocketId] = useState<string>("");

  useEffect(() => {
    socket.on("connect", () => {
      if (socket.id != undefined) {
        setSocketId(socket.id);
        console.log(`socket id: ${socket.id}`);
      } else {
        setSocketId("UNDEFINED...");
      }
    });
  }, []);

  return (
    <div>
      <h1>SOCKET_ID</h1>
      {socketId && <p>Connected: {socketId}</p>}
    </div>
  );
};

export default App;
