/** Shared constants used by both client and server. */

export const NavTab = {
  Blog: "Blog",
  Community: "Community",
  Travel: "Travel",
  Photography: "Photography",
  About: "About",
  Debug: "Debug",
} as const;

export type NavTab = (typeof NavTab)[keyof typeof NavTab];

export const NAV_TABS = Object.values(NavTab);

/** Default active tabs — all except Debug */
export const DEFAULT_ACTIVE_TABS = NAV_TABS.filter((t) => t !== NavTab.Debug);
