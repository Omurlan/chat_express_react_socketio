const { useState, useCallback } = require("react");
const { api } = require("shared/api");

export const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const loginUser = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const loggedUser = await api.post("/users/login", data);
      localStorage.setItem("user", JSON.stringify(loggedUser));
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
    loginUser,
  };
};
