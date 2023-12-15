import { useContext, useEffect } from "react";
import { ChatContext } from "shared/contexts";

export const useChatList = (userId) => {
  const { chats, chatsIsLoading, chatsError, chatsFetch } =
    useContext(ChatContext);

  useEffect(() => {
    if (userId) {
      chatsFetch(userId);
    }
  }, [userId]);

  return {
    chats,
    isLoading: chatsIsLoading,
    error: chatsError,
  };
};
