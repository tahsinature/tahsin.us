import { useLocation } from "react-router-dom";
import { useAppStore } from "@/stores/useAppStore";

export interface NavItem {
  label: string;
  to: string;
}

const BASE_NAV_ITEMS: NavItem[] = [
  { label: "Blog", to: "/blog" },
  { label: "Community", to: "/contributions" },
  { label: "Travel", to: "/travel" },
  { label: "Photography", to: "/photography" },
  { label: "About", to: "/about" },
];

export const useNavItems = () => {
  const debugMode = useAppStore((s) => s.config?.debugMode);
  const showDebug = debugMode && import.meta.env.DEV;
  return showDebug ? [...BASE_NAV_ITEMS, { label: "Debug", to: "/debug" }] : BASE_NAV_ITEMS;
};

export const useIsActiveRoute = () => {
  const { pathname } = useLocation();
  return (to: string) => {
    if (to === "/blog") return pathname === "/blog" || pathname.startsWith("/post/");
    if (to === "/photography") return pathname.startsWith("/photography");
    return pathname === to || pathname.startsWith(to + "/");
  };
};
