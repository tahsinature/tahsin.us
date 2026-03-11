import { siteConfig } from "@/config/site";
import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { BlurFadeIn } from "@/components/MotionWrapper";
import { motion } from "motion/react";
import { GearIcon } from "@/components/SVGs";
import { socialProfiles } from "@/data/social-profiles";
import { platforms } from "@/config/platforms";

const socials = socialProfiles
  .filter((s) => ["github", "linkedin", "email"].includes(s.platform))
  .filter((s) => s.href);

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
              <GearIcon className="w-8 h-8 text-primary animate-[gear-spin_8s_linear_infinite]" />
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
              {socials.map((s) => {
                const p = platforms[s.platform];
                return (
                  <a
                    key={s.platform}
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={p.name}
                    className="w-10 h-10 rounded-xl border border-border/50 bg-card/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    <img src={p.favicon} alt={p.name} className="w-[18px] h-[18px]" loading="lazy" />
                  </a>
                );
              })}
            </div>
          </BlurFadeIn>
        )}
      </div>
    </div>
  );
}
