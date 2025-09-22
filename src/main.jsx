import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { AppProvider } from "./context/AppContext";  // import AppProvider
import { AuthProvider } from "./context/AuthContext"; // if you have AuthContext

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <AuthProvider>          {/* wrap AuthProvider if you use useAuth */}
      <AppProvider>         {/* wrap AppProvider so useApp works */}
        <App />
      </AppProvider>
    </AuthProvider>
  </StrictMode>
);
