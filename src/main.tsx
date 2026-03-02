import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { useThemeStore } from "@/stores/useThemeStore";
import "@/index.css";
import App from "@/App.tsx";

// Apply theme before first render to avoid flash
const theme = useThemeStore.getState().theme;
document.documentElement.classList.toggle("dark", theme === "dark");

// Subscribe to future changes
useThemeStore.subscribe((state) => {
  document.documentElement.classList.toggle("dark", state.theme === "dark");
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
