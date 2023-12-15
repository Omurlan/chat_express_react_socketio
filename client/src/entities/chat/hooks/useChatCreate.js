import { useContext } from "react";
import { ChatContext } from "shared/contexts";

export const useChatCreate = () => {
  const { chats, chatCreate } = useContext(ChatContext);
  const { isCreating, createError } = chats;

  return {
    isLoading: isCreating,
    chatCreate,
    error: createError,
  };
};
