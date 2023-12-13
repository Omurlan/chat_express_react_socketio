import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./styles/app.css";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <div className="App">
      <NextUIProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </NextUIProvider>
    </div>
  );
}

export default App;
