import { createContext } from "react";

export const ChatContext = createContext({
  chats: null,
  isLoading: false,
  error: null,
});
