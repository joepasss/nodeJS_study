import { useEffect, useState } from "react";
import Message from "./components/Message";
import MessageInput from "./components/MessageInput";
import io from "socket.io-client";
import generateRandomUsername from "./utils/createUsername";

const socket = io("http://localhost:3000");

export interface MessageInterface {
  id: string;
  from_server: boolean;
  message: string;
}

const App = () => {
  const [socketId, setSocketId] = useState<string>("");
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [username, _] = useState<string>(generateRandomUsername());

  useEffect(() => {
    const handleConnect = () => {
      if (socket.id != undefined) {
        setSocketId(socket.id);
      }
    };

    const handleMessage = (msg: MessageInterface) => {
      if (msg != undefined) {
        setMessages((prev: MessageInterface[]) => [...prev, msg]);
      }
    };

    socket.on("connect", handleConnect);
    socket.on("message", handleMessage);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("message", handleMessage);
    };
  }, []);

  const sendMessage = (message: string) => {
    socket.emit("message", {
      id: socketId,
      from_server: false,
      message,
    });
  };

  return (
    <div className="container">
      {messages.map((message, index) => {
        return (
          <Message
            key={index}
            message={message}
            isMyMessage={socketId === message.id}
            username={username}
          />
        );
      })}
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default App;
