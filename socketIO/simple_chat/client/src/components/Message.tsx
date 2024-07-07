import { MessageInterface } from "src/App";

interface Props {
  message: MessageInterface;
  isMyMessage: boolean;
  username: string;
}

const Message: React.FC<Props> = ({ message, isMyMessage, username }) => {
  return (
    <div
      className={
        message.from_server
          ? "message from-server"
          : isMyMessage
            ? "message from-me"
            : "message"
      }>
      <p>
        {message.from_server
          ? message.message
          : `${username} \$ ${message.message}`}
      </p>
    </div>
  );
};

export default Message;
