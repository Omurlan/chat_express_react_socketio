import { useState, useCallback } from "react";
import { api } from "shared/api";
import { useUserMethods } from "./useUserMethods";

export const useRegisterUser = () => {
  const { setUser } = useUserMethods();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const registerUser = useCallback(
    async (data) => {
      setIsLoading(true);
      setError(null);

      try {
        const savedUser = await api.post("/users/register", data);
        setUser(savedUser);
        setData(savedUser);
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
    registerUser,
  };
};
