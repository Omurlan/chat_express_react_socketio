import { useGetUser } from "entities/auth";
import { LoginForm } from "features/auth";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const user = useGetUser();

  if (user) {
    return <Navigate to="/chat" />;
  }

  return <LoginForm />;
};
