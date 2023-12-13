import {
  NavbarBrand,
  Navbar as NNavbar,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";

import { useGetUser, useUserMethods } from "entities/auth";
import { memo } from "react";

import { Link } from "react-router-dom";

export const Navbar = memo(() => {
  const user = useGetUser();
  const { logout } = useUserMethods();

  return (
    <NNavbar>
      <NavbarBrand>
        <h2 className="font-bold text-2xl">Chat Application</h2>
      </NavbarBrand>

      <NavbarContent justify="end">
        {user ? (
          <NavbarItem>
            <Button onClick={logout} color="danger" variant="flat">
              Logout
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Link to="/login">Login</Link>
            </NavbarItem>

            <NavbarItem>
              <Button as={Link} color="primary" to="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </NNavbar>
  );
});
