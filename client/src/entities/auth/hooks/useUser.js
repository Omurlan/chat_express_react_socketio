import { useContext } from "react";
import { AuthContext } from "shared/contexts";

export const useUser = () => {
  const { isLoading, error, user, loginUser, logoutUser, registerUser } =
    useContext(AuthContext);

  return {
    isLoading,
    error,
    user,
    registerUser,
    loginUser,
    logoutUser,
  };
};
