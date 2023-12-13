const { useContext } = require("react");
const { AuthContext } = require("shared/contexts");

export const useUserMethods = () => {
  const { setUser, logout } = useContext(AuthContext);

  return {
    setUser,
    logout,
  };
};
