import { AuthContext } from "shared/contexts";

import { useState, useCallback } from "react";

const savedUser = JSON.parse(localStorage.getItem("user")) ?? null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(savedUser);

  const handleSetUser = useCallback((data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser: handleSetUser, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
