import { useContext } from "react";
import { ChatContext } from "shared/contexts";

export const useChatCreate = () => {
  const { chatCreate, chatCreateIsLoading, chatCreateError } =
    useContext(ChatContext);

  return {
    isLoading: chatCreateIsLoading,
    chatCreate,
    error: chatCreateError,
  };
};
