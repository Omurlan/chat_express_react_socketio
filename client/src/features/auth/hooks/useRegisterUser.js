const { useState, useCallback } = require("react");
const { api } = require("shared/api");

export const useRegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const registerUser = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const savedUser = await api.post("/users/register", data);
      localStorage.setItem("user", JSON.stringify(savedUser));
      setUser(savedUser);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    user,
    registerUser,
  };
};
