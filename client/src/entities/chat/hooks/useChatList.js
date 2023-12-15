import { useContext, useEffect } from "react";
import { ChatContext } from "shared/contexts";

export const useChatList = (userId) => {
  const { chats, chatsFetch } = useContext(ChatContext);

  const { isLoading, error, data } = chats;

  useEffect(() => {
    if (userId) {
      chatsFetch(userId);
    }
  }, [userId]);

  return {
    chats: data,
    isLoading,
    error,
  };
};
