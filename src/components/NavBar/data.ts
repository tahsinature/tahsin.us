export const navItems = [
  { name: "Home", href: "/", isActiveCheck: (pathname: string) => pathname === "/" },
  { name: "Works", href: "/works", isActiveCheck: (pathname: string) => pathname.startsWith("/works") },
  { name: "Blogs", href: "/blogs", isActiveCheck: (pathname: string) => pathname.startsWith("/blogs") },
  { name: "Tools", href: "/tools", isActiveCheck: (pathname: string) => pathname.startsWith("/tools") },
  { name: "Open Source", href: "/open-source", isActiveCheck: (pathname: string) => pathname.startsWith("/open-source") },
  { name: "Photographs", href: "/photographs", isActiveCheck: (pathname: string) => pathname.startsWith("/photographs") },
  { name: "Guestbook", href: "/guestbook", isActiveCheck: (pathname: string) => pathname.startsWith("/guestbook") },
  // { name: "Test", href: "/testpage", isActiveCheck: (pathname: string) => pathname.startsWith("/testpage") },
];
