import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage";
import { ChatPage } from "pages/ChatPage";
import { AuthLayout } from "../ui/AuthLayout";
import { NonAuthLayout } from "../ui/NonAuthLayout";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <h1>Page does not exist</h1>,
    children: [
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
  {
    element: <NonAuthLayout />,
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
    ],
  },
  {
    path: "/",
    errorElement: <h1>Page does not exist</h1>,
  },
]);
