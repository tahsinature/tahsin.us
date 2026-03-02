import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === "dark" ? "light" : "dark";
          document.documentElement.classList.add("theme-transitioning");
          document.documentElement.classList.toggle("dark", next === "dark");
          setTimeout(() => {
            document.documentElement.classList.remove("theme-transitioning");
          }, 500);
          return { theme: next };
        }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "tahsin-theme",
    },
  ),
);
