import { useContext, useEffect } from "react";
import { ChatContext } from "shared/contexts";

export const useChat = (userId) => {
  const { chats, isLoading, error, fetchChats } = useContext(ChatContext);

  useEffect(() => {
    if (userId) {
      fetchChats(userId);
    }
  }, [userId]);

  return {
    chats,
    isLoading,
    error,
  };
};
