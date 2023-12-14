import { ChatContext } from "shared/contexts";

import { useState, useCallback } from "react";
import { api } from "shared/api";

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChats = useCallback(async (userId) => {
    setIsLoading(true);
    try {
      const chats = await api.get(`/chats/${userId}`);

      setChats(chats);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ChatContext.Provider value={{ chats, isLoading, error, fetchChats }}>
      {children}
    </ChatContext.Provider>
  );
};
