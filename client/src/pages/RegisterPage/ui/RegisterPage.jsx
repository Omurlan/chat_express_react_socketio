import { useUser } from "entities/auth";
import { RegisterForm } from "features/auth";
import { Navigate } from "react-router-dom";

export const RegisterPage = () => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/chat" />;
  } else {
    return <RegisterForm />;
  }
};
