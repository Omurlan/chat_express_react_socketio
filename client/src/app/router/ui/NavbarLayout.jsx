import { Outlet } from "react-router-dom";
import { Navbar } from "widgets/Navbar";

export const NavbarLayout = () => (
  <>
    <Navbar />

    <div className="container mx-auto">
      <Outlet />
    </div>
  </>
);
