import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Logo from "@/components/Logo";
import { siteConfig } from "@/config/site";

const NAV_ITEMS = [
  { label: "Blog", to: "/blog" },
  { label: "Community", to: "/contributions" },
  { label: "Photography", to: "/photography" },
  { label: "About", to: "/about" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-bg-primary/70 backdrop-blur-2xl border-b border-border/40 shadow-[0_1px_8px_rgba(0,0,0,0.15)]" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group min-w-0" onClick={() => setMobileOpen(false)}>
            <Logo size={32} className="flex-shrink-0" />
            <span className="text-text-primary font-semibold text-lg tracking-tight group-hover:text-accent-yellow transition-colors truncate">{siteConfig.name.full}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} to={item.to} className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="text-text-secondary hover:text-text-primary transition-colors" aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-text-secondary hover:text-text-primary transition-colors" aria-label="Toggle menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <nav
          className={`md:hidden overflow-hidden border-t border-border bg-bg-primary/95 backdrop-blur-md transition-all duration-300 ease-out ${
            mobileOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 border-transparent"
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="text-text-secondary hover:text-text-primary hover:bg-bg-card transition-all text-base font-medium px-3 py-3 rounded-md"
                style={{
                  transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
                  transition: "opacity 300ms ease, transform 300ms ease",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Backdrop overlay — portaled to body so it covers everything */}
      {createPortal(
        <div
          className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-out ${
            mobileOpen ? "bg-black/15 backdrop-blur-[2px] pointer-events-auto" : "bg-transparent backdrop-blur-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
        />,
        document.body,
      )}
    </>
  );
}
