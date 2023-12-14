import { useUser } from "entities/auth";
import { useChat } from "entities/chat";

export const ChatWidget = () => {
  const { user } = useUser();

  const { chats, error, isLoading } = useChat(user._id);

  return <h1>CHAT</h1>;
};
