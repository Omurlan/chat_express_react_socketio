import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage/ui/RegisterPage";
import { ChatPage } from "pages/ChatPage";
import { NavbarLayout } from "../ui/NavbarLayout";

export const router = createBrowserRouter([
  {
    element: <NavbarLayout />,
    errorElement: <h1>Page does not exist</h1>,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
  {
    path: "/",
    errorElement: <h1>Page does not exist</h1>,
  },
]);
