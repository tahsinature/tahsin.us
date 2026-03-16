import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useAppStore } from "@/stores/useAppStore";
import Logo from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { getSocial } from "@/data/social-profiles";
import { useNavItems, useIsActiveRoute } from "@/data/navigation";

export function MobileNavOverlay() {
  const open = useAppStore((s) => s.mobileNavOpen);
  const setOpen = useAppStore((s) => s.setMobileNavOpen);
  const navItems = useNavItems();
  const isActive = useIsActiveRoute();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, setOpen]);

  if (!open) return null;


  return (
    <div
      className="fixed inset-0 z-[100] bg-background"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="h-full flex flex-col px-6 sm:px-8 pt-5 pb-8">
        {/* Top bar */}
        <div className="flex items-center justify-between relative z-10">
          <Logo size={28} className="opacity-50" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(false)}
              className="h-9 w-9 rounded-xl bg-muted/80 flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col justify-center -mt-12">
          {navItems.map((item, i) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.05 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-center justify-between py-4 border-b border-border/15 transition-colors",
                  isActive(item.to)
                    ? "text-primary"
                    : "text-muted-foreground active:text-foreground",
                )}
              >
                <span className="text-[2rem] sm:text-4xl font-semibold tracking-tight">
                  {item.label}
                </span>
                {isActive(item.to) && (
                  <span className="h-2 w-2 rounded-full bg-primary" />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-xs text-muted-foreground/50">
              {getSocial("email")?.handle}
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground/35">
            &copy; {new Date().getFullYear()} {siteConfig.name.brand}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
