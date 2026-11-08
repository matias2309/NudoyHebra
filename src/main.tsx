import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/base.css";
import "./styles/magazine.css";
import "./styles/theme-a.css";
import "./styles/theme-b.css";
import "./styles/theme-c.css";
import "./styles/prototype.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
