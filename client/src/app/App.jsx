import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./styles/app.css";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./providers/AuthProvider";
import { ChatProvider } from "./providers/ChatProvider";

function App() {
  return (
    <div className="App">
      <NextUIProvider>
        <AuthProvider>
          <ChatProvider>
            <RouterProvider router={router} />
          </ChatProvider>
        </AuthProvider>
      </NextUIProvider>
    </div>
  );
}

export default App;
