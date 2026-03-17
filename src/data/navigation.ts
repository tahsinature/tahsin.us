import { lazy, type ComponentType } from "react";
import { useLocation } from "react-router-dom";
import { useAppStore } from "@/stores/useAppStore";
import { NavTab, DEFAULT_ACTIVE_TABS } from "@shared/api";

export interface NavItem {
  label: string;
  to: string;
}

export interface RouteEntry {
  path: string;
  element: ComponentType<{ fetchUrl?: string; title?: string }>;
  props?: Record<string, string>;
}

export interface TabConfig {
  tab: NavTab;
  navTo: string;
  routes: RouteEntry[];
}

const AboutPage = lazy(() => import("@/pages/AboutPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const ContributionsPage = lazy(() => import("@/pages/ContributionsPage"));
const PhotographyPage = lazy(() => import("@/pages/PhotographyPage"));
const TripGalleryPage = lazy(() => import("@/pages/TripGalleryPage"));
const PageView = lazy(() => import("@/pages/PageView"));
const DebugPage = lazy(() => import("@/pages/DebugPage"));

export const TAB_CONFIGS: TabConfig[] = [
  {
    tab: NavTab.Blog,
    navTo: "/blog",
    routes: [
      { path: "/blog", element: BlogPage },
      { path: "/post/:slug", element: BlogPostPage },
    ],
  },
  {
    tab: NavTab.Community,
    navTo: "/contributions",
    routes: [{ path: "/contributions", element: ContributionsPage }],
  },
  {
    tab: NavTab.Travel,
    navTo: "/travel",
    routes: [{ path: "/travel", element: PageView, props: { fetchUrl: "/api/pages/travel", title: "Travel" } }],
  },
  {
    tab: NavTab.Photography,
    navTo: "/photography",
    routes: [
      { path: "/photography", element: PhotographyPage },
      { path: "/photography/:slug", element: TripGalleryPage },
    ],
  },
  {
    tab: NavTab.About,
    navTo: "/about",
    routes: [{ path: "/about", element: AboutPage }],
  },
  {
    tab: NavTab.Debug,
    navTo: "/debug",
    routes: [{ path: "/debug", element: DebugPage }],
  },
];

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
