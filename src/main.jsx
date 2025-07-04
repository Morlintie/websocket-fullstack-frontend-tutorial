import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AuthProvider } from "../contexts/AuthContext";
import { MessageProvider } from "../contexts/MessageContext";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <MessageProvider>
      <App />
    </MessageProvider>
  </AuthProvider>
);
