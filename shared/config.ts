/** Shared configuration — tab routes and app-level defaults. */

import { NAV_TABS, NavTab } from "./constants";

/** Default active tabs — all except Debug */
export const DEFAULT_ACTIVE_TABS = NAV_TABS.filter((t) => t !== NavTab.Debug);

interface TabRouteDef {
  tab: string;
  navTo: string;
  routes: { path: string; page: string; props?: Record<string, string> }[];
}

/**
 * Route definitions for all tabs — single source of truth.
 * Comment out a tab in NavTab (constants.ts) to disable it everywhere.
 * Entries here for removed tabs are automatically ignored.
 */
const ALL_TAB_ROUTES: TabRouteDef[] = [
  {
    tab: "Blog",
    navTo: "/blog",
    routes: [
      { path: "/blog", page: "BlogPage" },
      { path: "/post/:slug", page: "BlogPostPage" },
    ],
  },
  {
    tab: "Community",
    navTo: "/contributions",
    routes: [{ path: "/contributions", page: "ContributionsPage" }],
  },
  {
    tab: "Travel",
    navTo: "/travel",
    routes: [{ path: "/travel", page: "PageView", props: { fetchUrl: "/api/pages/travel", title: "Travel" } }],
  },
  {
    tab: "Photography",
    navTo: "/photography",
    routes: [
      { path: "/photography", page: "PhotographyPage" },
      { path: "/photography/:slug", page: "TripGalleryPage" },
    ],
  },
  {
    tab: "About",
    navTo: "/about",
    routes: [{ path: "/about", page: "AboutPage" }],
  },
  {
    tab: "Debug",
    navTo: "/debug",
    routes: [{ path: "/debug", page: "DebugPage" }],
  },
];

/** Only includes routes for tabs that exist in NavTab */
export const TAB_ROUTES = ALL_TAB_ROUTES.filter((t) => (NAV_TABS as string[]).includes(t.tab));
