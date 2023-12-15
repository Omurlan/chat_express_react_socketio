import { useContext } from "react";
import { ChatContext } from "shared/contexts";

export const useChatCurrent = () => {
  const { currentChat, currentChatMessagesFetch } = useContext(ChatContext);

  const { isLoading, error, data } = currentChat;

  return {
    isLoading,
    currentChat: data,
    currentChatMessagesFetch,
    error,
  };
};
