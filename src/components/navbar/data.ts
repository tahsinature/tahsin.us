export const navItems = [
  { name: "Home", href: "/", isActiveCheck: (pathname: string) => pathname === "/" },
  { name: "Works", href: "/works", isActiveCheck: (pathname: string) => pathname.startsWith("/works") },
  { name: "Blogs", href: "/blogs", isActiveCheck: (pathname: string) => pathname.startsWith("/blogs") },
  { name: "Tools", href: "/tools", isActiveCheck: (pathname: string) => pathname.startsWith("/tools") },
  { name: "Photographs", href: "/photographs", isActiveCheck: (pathname: string) => pathname.startsWith("/photographs") },
  { name: "Test", href: "/testpage", isActiveCheck: (pathname: string) => pathname.startsWith("/testpage") },
];
