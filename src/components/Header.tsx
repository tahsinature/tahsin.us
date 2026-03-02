import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileNavTrigger } from "@/components/layout/MobileNavTrigger";

const NAV_ITEMS = [
  { label: "Blog", to: "/blog" },
  { label: "Community", to: "/contributions" },
  { label: "Photography", to: "/photography" },
  { label: "About", to: "/about" },
];

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const isActive = (to: string) => {
    if (to === "/blog")
      return (
        location.pathname === "/blog" ||
        location.pathname.startsWith("/post/")
      );
    if (to === "/photography")
      return location.pathname.startsWith("/photography");
    if (to === "/contributions")
      return location.pathname === "/contributions";
    return location.pathname === to;
  };

  const activeIndex = NAV_ITEMS.findIndex((item) => isActive(item.to));

  const measurePill = useCallback(() => {
    if (activeIndex === -1 || !navRef.current) {
      setPillStyle(null);
      return;
    }
    const el = itemRefs.current[activeIndex];
    if (!el || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPillStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
  }, [activeIndex]);

  useEffect(() => {
    measurePill();
  }, [measurePill]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-300",
        scrolled
          ? "bg-background/80 shadow-[0_1px_12px_rgba(0,0,0,0.04)] border-b border-border/50 dark:shadow-[0_1px_12px_rgba(0,0,0,0.2)]"
          : "bg-background/60",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <motion.div
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Logo size={32} className="flex-shrink-0" />
            </motion.div>
            <span className="font-semibold text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
              {siteConfig.name.brand}
            </span>
          </Link>

          {/* Desktop Nav — Segmented Control */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center gap-0.5 rounded-xl bg-muted/50 p-1 ring-1 ring-border/20 relative"
          >
            {/* Sliding pill */}
            {pillStyle && (
              <motion.span
                className="absolute top-1 bottom-1 rounded-lg bg-primary/10 shadow-sm ring-1 ring-primary/25"
                animate={{ left: pillStyle.left, width: pillStyle.width }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            {NAV_ITEMS.map((item, i) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className={cn(
                    "relative z-10 px-4 py-1.5 text-sm font-medium transition-colors rounded-lg",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <MobileNavTrigger />
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
