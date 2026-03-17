import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_ACTIVE_TABS } from "@shared/api";
import type { AppConfig } from "@shared/api";

type Theme = "dark" | "light";

interface AppState {
  // ── Theme ──
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  // ── Mobile nav ──
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;

  // ── Server config ──
  config: AppConfig | null;
  configStatus: "idle" | "loading" | "ready" | "error";
  fetchConfig: () => Promise<void>;
  setConfig: (config: AppConfig) => void;

}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Theme ──
      theme: "dark",
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === "dark" ? "light" : "dark";
          document.documentElement.classList.toggle("dark", next === "dark");
          document.documentElement.classList.toggle("light", next === "light");
          return { theme: next };
        }),
      setTheme: (theme) => set({ theme }),

      // ── Mobile nav ──
      mobileNavOpen: false,
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

      // ── Server config ──
      config: null,
      configStatus: "idle",
      setConfig: (config) => set({ config }),
      fetchConfig: async () => {
        if (get().configStatus === "loading" || get().configStatus === "ready") return;
        set({ configStatus: "loading" });
        try {
          const res = await fetch("/api/ops/config");
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const config: AppConfig = await res.json();
          set({ config, configStatus: "ready" });
        } catch {
          // Fallback defaults if server is unreachable
          set({
            config: { maintenanceMode: false, activeTabs: [...DEFAULT_ACTIVE_TABS], geo: null },
            configStatus: "error",
          });
        }
      },
    }),
    {
      name: "tahsin-app",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
