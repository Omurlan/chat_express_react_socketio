import { useContext } from "react";
import { ChatContext } from "shared/contexts";

export const useUsersToChat = () => {
  const { usersToChat } = useContext(ChatContext);

  const { isLoading, error, data } = usersToChat;

  return {
    usersToChat: data,
    isLoading,
    error,
  };
};
