import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "pages/LoginPage";
import { RegisterPage } from "pages/RegisterPage/ui/Register";
import { ChatPage } from "pages/ChatPage";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/chat",
        element: <ChatPage />
    },
    {
        path: "/",
        errorElement: <h1>Page does not exist</h1>
    }
])