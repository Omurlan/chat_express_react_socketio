import { useUser } from "entities/auth";
import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "widgets/Navbar";

export const AuthLayout = () => {
  const { user } = useUser();

  if (user) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto">
          <Outlet />
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};
