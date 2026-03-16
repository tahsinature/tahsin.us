import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { useAppStore } from "@/stores/useAppStore";
import "@/index.css";
import App from "@/App.tsx";

// Apply theme before first render to avoid flash
const theme = useAppStore.getState().theme;
document.documentElement.classList.toggle("dark", theme === "dark");
document.documentElement.classList.toggle("light", theme === "light");

// Subscribe to future changes
useAppStore.subscribe((state) => {
  document.documentElement.classList.toggle("dark", state.theme === "dark");
  document.documentElement.classList.toggle("light", state.theme === "light");
});

// Fetch server config before mount
useAppStore.getState().fetchConfig();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
