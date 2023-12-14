import { useContext } from "react";
import { AuthContext } from "shared/contexts";

export const useUser = () => {
  const { isLoading, error, user, loginUser, logoutUser } =
    useContext(AuthContext);

  return {
    isLoading,
    error,
    user,
    loginUser,
    logoutUser,
  };
};
