import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  isLoading: false,
  error: null,
});
