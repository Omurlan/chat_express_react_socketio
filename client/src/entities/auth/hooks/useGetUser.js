import { useContext } from "react";
import { AuthContext } from "shared/contexts";

export const useGetUser = () => {
  return useContext(AuthContext).user;
};
