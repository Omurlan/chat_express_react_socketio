import { useContext } from "react";
import { ChatContext } from "shared/contexts";

export const useUsersToChat = () => {
  const { usersToChat, usersToChatIsLoading, usersToChatError } =
    useContext(ChatContext);

  return {
    usersToChat,
    isLoading: usersToChatIsLoading,
    error: usersToChatError,
  };
};
