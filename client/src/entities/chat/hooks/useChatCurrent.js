import { useContext } from "react";
import { ChatContext } from "shared/contexts";

export const useChatCurrent = () => {
  const {
    currentChatMessages,
    currentChat,
    messageSend,
    currentChatMessagesFetch,
  } = useContext(ChatContext);

  const { isLoading, error, data, isSending, sendError } = currentChatMessages;

  return {
    isLoading,
    isSending,
    sendError,
    currentChat,
    messages: data,
    messageSend,
    currentChatMessagesFetch,
    error,
  };
};
