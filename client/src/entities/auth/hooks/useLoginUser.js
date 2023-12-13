import { useState, useCallback } from "react";
import { api } from "shared/api";
import { useUserMethods } from "./useUserMethods";

export const useLoginUser = () => {
  const { setUser } = useUserMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loginUser = useCallback(
    async (data) => {
      setIsLoading(true);
      setError(null);

      try {
        const loggedUser = await api.post("/users/login", data);
        setUser(loggedUser);
        setData(loggedUser);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [setUser]
  );

  return {
    isLoading,
    error,
    data,
    loginUser,
  };
};
