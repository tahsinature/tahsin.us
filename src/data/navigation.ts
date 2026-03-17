import { lazy, type ComponentType } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "@/stores/useAppStore";
import { DEFAULT_ACTIVE_TABS, TAB_ROUTES } from "@shared/api";

export interface NavItem {
  label: string;
  to: string;
}

export interface TabConfig {
  tab: string;
  navTo: string;
  routes: { path: string; element: ComponentType<Record<string, string>>; props?: Record<string, string> }[];
}

const PAGE_COMPONENTS: Record<string, ComponentType<Record<string, string>>> = {
  AboutPage: lazy(() => import("@/pages/AboutPage")),
  BlogPage: lazy(() => import("@/pages/BlogPage")),
  BlogPostPage: lazy(() => import("@/pages/BlogPostPage")),
  ContributionsPage: lazy(() => import("@/pages/ContributionsPage")),
  PhotographyPage: lazy(() => import("@/pages/PhotographyPage")),
  TripGalleryPage: lazy(() => import("@/pages/TripGalleryPage")),
  PageView: lazy(() => import("@/pages/PageView")),
  DebugPage: lazy(() => import("@/pages/DebugPage")),
};

export const TAB_CONFIGS: TabConfig[] = TAB_ROUTES.map((def) => ({
  tab: def.tab,
  navTo: def.navTo,
  routes: def.routes.map((r) => ({
    path: r.path,
    element: PAGE_COMPONENTS[r.page],
    props: r.props,
  })),
}));

export const useActiveTabs = () => {
  return useAppStore((s) => s.config?.activeTabs) ?? DEFAULT_ACTIVE_TABS;
};

export const useNavItems = () => {
  const activeTabs = useActiveTabs();
  return TAB_CONFIGS.filter((c) => (activeTabs as string[]).includes(c.tab)).map((c) => ({ label: c.tab, to: c.navTo }));
};

export const useIsActiveRoute = () => {
  const { pathname } = useLocation();
  return (to: string) => {
    if (to === "/blog") return pathname === "/blog" || pathname.startsWith("/post/");
    if (to === "/photography") return pathname.startsWith("/photography");
    return pathname === to || pathname.startsWith(to + "/");
  };
};
