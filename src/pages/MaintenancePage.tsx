import { siteConfig } from "@/config/site";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { BlurFadeIn } from "@/components/MotionWrapper";
import { motion } from "motion/react";

const SOCIAL_ICONS: Record<string, string> = {
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  email:
    "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z",
};

const socials = [
  { key: "github", href: siteConfig.social.github, label: "GitHub" },
  { key: "linkedin", href: siteConfig.social.linkedin, label: "LinkedIn" },
  { key: "email", href: siteConfig.social.email, label: "Email" },
].filter((s) => s.href);

const stagger = 0.12;

export default function MaintenancePage() {
  const { maintenance } = siteConfig;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden px-6">
      {/* ── Floating gradient orbs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full opacity-20 blur-3xl animate-[float-orb_8s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-[float-orb_10s_ease-in-out_infinite_reverse]"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full opacity-10 blur-3xl animate-[float-orb_12s_ease-in-out_infinite_2s]"
          style={{ background: "radial-gradient(circle, var(--warm) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Theme toggle (top-right) ── */}
      {maintenance.showThemeToggle && (
        <div className="absolute top-6 right-6 z-10">
          <BlurFadeIn delay={0.8}>
            <ThemeToggle />
          </BlurFadeIn>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Logo + brand */}
        <BlurFadeIn delay={stagger * 0}>
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Logo size={40} className="flex-shrink-0" />
            </motion.div>
            <span className="font-semibold text-xl tracking-tight">
              {siteConfig.name.brand}
            </span>
          </div>
        </BlurFadeIn>

        {/* Gear icon */}
        <BlurFadeIn delay={stagger * 1}>
          <div className="mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary animate-[gear-spin_8s_linear_infinite]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
        </BlurFadeIn>

        {/* Title */}
        <BlurFadeIn delay={stagger * 2}>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            {maintenance.title}
          </h1>
        </BlurFadeIn>

        {/* Message */}
        <BlurFadeIn delay={stagger * 3}>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
            {maintenance.message}
          </p>
        </BlurFadeIn>

        {/* Status badge */}
        <BlurFadeIn delay={stagger * 4}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-[pulse-dot_2s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-xs font-medium text-primary">
              Maintenance Mode
            </span>
          </div>
        </BlurFadeIn>

        {/* Social links */}
        {maintenance.showSocials && socials.length > 0 && (
          <BlurFadeIn delay={stagger * 5}>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl border border-border/50 bg-card/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                    <path d={SOCIAL_ICONS[s.key]} />
                  </svg>
                </a>
              ))}
            </div>
          </BlurFadeIn>
        )}
      </div>
    </div>
  );
}
