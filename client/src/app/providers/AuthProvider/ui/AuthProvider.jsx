import { AuthContext } from "shared/contexts";

import { useState, useCallback } from "react";
import { api } from "shared/api";

const savedUser = JSON.parse(localStorage.getItem("user")) ?? null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(savedUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const newUser = await api.post("/users/register", data);
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginUser = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const loggedUser = await api.post("/users/login", data);
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, loginUser, logoutUser, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
