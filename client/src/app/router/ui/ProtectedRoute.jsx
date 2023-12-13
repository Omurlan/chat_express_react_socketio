import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "shared/contexts";

export const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
